from flask import Blueprint, request, jsonify
from app.status_codes import HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR, HTTP_409_CONFLICT, HTTP_201_CREATED
import validators
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from app.models.customer import Customer
from app.models.admin import Admin
from app.extensions import db, bcrypt

auth = Blueprint('auth', __name__, url_prefix='/auth')

# ----------------- Admin -----------------

# Create admin
@auth.route('/admin/create', methods=['POST'])
def create_admin():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    # Validations
    if not name or not email or not password:
        return jsonify({'error': 'All fields are required'}), HTTP_400_BAD_REQUEST
    if not validators.email(email):
        return jsonify({'error': 'Invalid email address'}), HTTP_400_BAD_REQUEST
    if Admin.query.filter_by(name=name).first():
        return jsonify({'error': 'Name already exists'}), HTTP_409_CONFLICT
    if Admin.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already exists'}), HTTP_409_CONFLICT
    if len(password) < 8:
        return jsonify({'error': 'Password is too short'}), HTTP_400_BAD_REQUEST

    new_admin = Admin(
        name=name,
        email=email,
        is_admin=True,
        password=bcrypt.generate_password_hash(password).decode('utf-8')
    )
    db.session.add(new_admin)
    db.session.commit()

    return jsonify({'message': 'Admin created successfully'}), HTTP_201_CREATED


# Admin login (only email + password)
@auth.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': "Email and password are required"}), HTTP_400_BAD_REQUEST

    admin = Admin.query.filter_by(email=email, is_admin=True).first()
    if admin is None or not bcrypt.check_password_hash(admin.password, password):
        return jsonify({'error': 'Invalid email or password'}), HTTP_400_BAD_REQUEST

    access_token = create_access_token(identity=str(admin.id), additional_claims={"role": "admin"})
    refresh_token = create_refresh_token(identity=str(admin.id))

    return jsonify({
        'message': f"{admin.name} has successfully logged in",
        'access_token': access_token,
        'refresh_token': refresh_token,
        'admin': {
            'id': admin.id,
            'name': admin.name,
            'email': admin.email,
            'is_admin': admin.is_admin
        }
    }), HTTP_200_OK


# ----------------- Customer -----------------

# Customer registration
@auth.route('/customer/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    phone_number = data.get('phone_number')
    password = data.get('password')

    if not name or not email or not phone_number or not password:
        return jsonify({'error': "All fields are required"}), HTTP_400_BAD_REQUEST
    if Customer.query.filter_by(email=email).first():
        return jsonify({'error': 'Email is already in use'}), HTTP_409_CONFLICT
    if Customer.query.filter_by(phone_number=phone_number).first():
        return jsonify({'error': 'Phone number is already in use'}), HTTP_409_CONFLICT
    if not validators.email(email):
        return jsonify({'error': "Email is not valid"}), HTTP_400_BAD_REQUEST
    if len(password) < 8:
        return jsonify({'error': "Password is too short"}), HTTP_400_BAD_REQUEST

    try:
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_customer = Customer(
            name=name,
            email=email,
            phone_number=phone_number,
            password=hashed_password,
            is_admin=False
        )
        db.session.add(new_customer)
        db.session.commit()

        return jsonify({
            'message': f"{new_customer.name} has successfully been created as a customer",
            'customer': {
                "id": new_customer.id,
                "name": new_customer.name,
                "email": new_customer.email,
                "phone_number": new_customer.phone_number
            }
        }), HTTP_201_CREATED

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR


# Customer login
@auth.route('/customer/login', methods=['POST'])
def login_customer():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': "Email and password are required"}), HTTP_400_BAD_REQUEST

    customer = Customer.query.filter_by(email=email).first()
    if not customer or not bcrypt.check_password_hash(customer.password, password):
        return jsonify({'error': 'Invalid email or password'}), HTTP_400_BAD_REQUEST

    access_token = create_access_token(identity=str(customer.id), additional_claims={"role": "customer"})
    refresh_token = create_refresh_token(identity=str(customer.id))

    return jsonify({
        'message': f"{customer.name} has successfully logged in",
        'customer': {
            "id": customer.id,
            "name": customer.name,
            "email": customer.email,
            "phone_number": customer.phone_number,
            "access_token": access_token,
            "refresh_token": refresh_token
        }
    }), HTTP_200_OK


# Token refresh
@auth.route('/token/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    return jsonify({"access_token": access_token})
