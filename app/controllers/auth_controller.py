from flask import Blueprint, request, jsonify
<<<<<<< HEAD
from app.status_codes import HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR, HTTP_409_CONFLICT, HTTP_201_CREATED
import validators
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from app.models.customer import Customer
=======
from app.status_codes import HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR, HTTP_409_CONFLICT, HTTP_201_CREATED, HTTP_403_FORBIDDEN
import validators
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, get_jwt
>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17
from app.models.admin import Admin
from app.extensions import db, bcrypt

auth = Blueprint('auth', __name__, url_prefix='/auth')

<<<<<<< HEAD
# ----------------- Admin -----------------

# Create admin
@auth.route('/admin/create', methods=['POST'])
def create_admin():
=======
# -------------------------
# Super Admin creates admins
# -------------------------
@auth.route('/admin/create', methods=['POST'])
@jwt_required()  # Must be logged in
def create_admin():
    creator_id = get_jwt_identity()
    creator = Admin.query.get(creator_id)

    # Only super admin can create admins
    if creator.role != "super_admin":
        return jsonify({"error": "Only super admin can create admins"}), HTTP_403_FORBIDDEN

>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
<<<<<<< HEAD

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
=======
    role = data.get('role', 'admin')  # default role is 'admin'

    # VALIDATIONS
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

    # Create new admin
    new_admin = Admin(
        name=name,
        email=email,
        password=bcrypt.generate_password_hash(password).decode('utf-8'),
        role=role
>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17
    )
    db.session.add(new_admin)
    db.session.commit()

<<<<<<< HEAD
    return jsonify({'message': 'Admin created successfully'}), HTTP_201_CREATED


# Admin login (only email + password)
@auth.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.json
=======
    return jsonify({'message': f'{role} created successfully'}), HTTP_201_CREATED


# -------------------------
# Admin login
# -------------------------
@auth.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json()
>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': "Email and password are required"}), HTTP_400_BAD_REQUEST

<<<<<<< HEAD
    admin = Admin.query.filter_by(email=email, is_admin=True).first()
    if admin is None or not bcrypt.check_password_hash(admin.password, password):
        return jsonify({'error': 'Invalid email or password'}), HTTP_400_BAD_REQUEST

    access_token = create_access_token(identity=str(admin.id), additional_claims={"role": "admin"})
=======
    admin = Admin.query.filter_by(email=email).first()
    if admin is None or not bcrypt.check_password_hash(admin.password, password):
        return jsonify({'error': 'Invalid email or password'}), HTTP_400_BAD_REQUEST

    access_token = create_access_token(identity=str(admin.id), additional_claims={"role": admin.role})
>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17
    refresh_token = create_refresh_token(identity=str(admin.id))

    return jsonify({
        'message': f"{admin.name} has successfully logged in",
        'access_token': access_token,
        'refresh_token': refresh_token,
        'admin': {
            'id': admin.id,
            'name': admin.name,
            'email': admin.email,
<<<<<<< HEAD
            'is_admin': admin.is_admin
=======
            'role': admin.role
>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17
        }
    }), HTTP_200_OK


<<<<<<< HEAD
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
=======
# -------------------------
# Refresh token
# -------------------------
@auth.route("/token/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    claims = get_jwt()
    access_token = create_access_token(identity=identity, additional_claims={"role": claims.get("role")})
    return jsonify({"access_token": access_token}), HTTP_200_OK

# -------------------------
# Get all admins
# -------------------------
@auth.route('/admins', methods=['GET'])
@jwt_required()  # Must be logged in
def get_all_admins():
    requester_id = get_jwt_identity()
    requester = Admin.query.get(requester_id)

    # Only super admin can view all admins
    if requester.role != "super_admin":
        return jsonify({"error": "Only super admin can view all admins"}), HTTP_403_FORBIDDEN

    admins = Admin.query.all()
    admins_list = []

    for admin in admins:
        admins_list.append({
            'id': admin.id,
            'name': admin.name,
            'email': admin.email,
            'role': admin.role
        })

    return jsonify({'admins': admins_list}), HTTP_200_OK

>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17
