from flask import Blueprint, request, jsonify
<<<<<<< HEAD
from app.status_codes import HTTP_400_BAD_REQUEST,HTTP_401_UNAUTHORIZED,HTTP_500_INTERNAL_SERVER_ERROR,HTTP_200_OK, HTTP_404_NOT_FOUND,HTTP_409_CONFLICT
=======
from app.status_codes import (
    HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_403_FORBIDDEN,
    HTTP_500_INTERNAL_SERVER_ERROR, HTTP_200_OK, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT
)
>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17
import validators
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.admin import Admin
from app.extensions import db, bcrypt

<<<<<<< HEAD
# Blueprint
admin = Blueprint('admin', __name__, url_prefix='/admin')  

# Get all admins
@admin.route('/all', methods=['GET'])
@jwt_required()
def get_all_admins():

    current_user_id = get_jwt_identity()
    current_admin = Admin.query.get(current_user_id)
    if not current_admin or not current_admin.is_admin:
        return jsonify({'error': 'Admins only'}), HTTP_401_UNAUTHORIZED
 
=======
# -------------------------
# Blueprint
# -------------------------
admin = Blueprint('admin', __name__, url_prefix='/admin')

# -------------------------
# Get all admins (Super Admin only)
# -------------------------
@admin.route('/all', methods=['GET'])
@jwt_required()
def get_all_admins():
    current_admin = Admin.query.get(get_jwt_identity())
    if not current_admin or current_admin.role != "super_admin":
        return jsonify({'error': 'Super admin only'}), HTTP_403_FORBIDDEN

>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17
    try:
        all_admins = Admin.query.all()
        if not all_admins:
            return jsonify({'message': 'No admins found'}), HTTP_404_NOT_FOUND

        admin_list = []
<<<<<<< HEAD
        for admin in all_admins:
            admin_info = {
                'id': admin.id,
                'name': admin.name,
                'email': admin.email,
                'is_admin': admin.is_admin
            }
            admin_list.append(admin_info)
=======
        for adm in all_admins:
            admin_list.append({
                'id': adm.id,
                'name': adm.name,
                'email': adm.email,
                'role': adm.role
            })
>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17

        return jsonify({'admins': admin_list}), HTTP_200_OK

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR
<<<<<<< HEAD
    
# Get admin by ID
@admin.route('/<int:id>', methods=['GET'])
def get_admin_by_id(id):
    try:
        admin = Admin.query.get(id)
        if not admin:
            return jsonify({'message': 'Admin not found'}), HTTP_404_NOT_FOUND

        admin_info = {
            'id': admin.id,
            'name': admin.name,
            'email': admin.email,
            'is_admin': admin.is_admin
        }

        return jsonify({'admin': admin_info}), HTTP_200_OK
=======

# -------------------------
# Get admin by ID
# -------------------------
@admin.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_admin_by_id(id):
    current_admin = Admin.query.get(get_jwt_identity())
    if not current_admin:
        return jsonify({'error': 'Unauthorized'}), HTTP_401_UNAUTHORIZED

    try:
        adm = Admin.query.get(id)
        if not adm:
            return jsonify({'message': 'Admin not found'}), HTTP_404_NOT_FOUND

        return jsonify({
            'admin': {
                'id': adm.id,
                'name': adm.name,
                'email': adm.email,
                'role': adm.role
            }
        }), HTTP_200_OK
>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

<<<<<<< HEAD
# Update admin
@admin.route('/<int:id>', methods=['PUT'])
def update_admin(id):
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No input data provided'}), HTTP_400_BAD_REQUEST
    
    admin = Admin.query.get(id)

    #Validations
    if not admin:
        return jsonify({'error': 'Admin not found'}), HTTP_404_NOT_FOUND
    
    if 'name' in data and data['name'] != admin.name:
        if Admin.query.filter_by(name=data['name']).first():
            return jsonify({'error': 'Username already in use'}), HTTP_409_CONFLICT
        admin.name = data['name']

    if 'email' not in data or not data['email']:
        return jsonify({'error': 'Email is required'}), HTTP_400_BAD_REQUEST
    
    if not validators.email(data['email']):
        return jsonify({'error': 'Invalid email format'}), HTTP_400_BAD_REQUEST
    
    if 'email' in data and data['email'] != admin.email:
        if Admin.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already in use'}), HTTP_409_CONFLICT
        admin.email = data['email']
    
    if 'password' not in data or not data['password']:
        return jsonify({'error': 'Password is required'}), HTTP_400_BAD_REQUEST
    
    if 'is_admin' in data:
        admin.is_admin = bool(data['is_admin'])

    admin.email = data.get('email', admin.email)
    admin.password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    db.session.commit()

    return jsonify({'message': 'Admin updated successfully'}), HTTP_200_OK

# Delete admin
@admin.route('/<int:id>', methods=['DELETE'])
def delete_admin(id):
    try:
        admin = Admin.query.get(id)
        if not admin:
            return jsonify({'error': 'Admin not found'}), HTTP_404_NOT_FOUND

        db.session.delete(admin)
        db.session.commit()

=======
# -------------------------
# Update admin
# -------------------------
@admin.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_admin(id):
    current_admin = Admin.query.get(get_jwt_identity())
    if not current_admin:
        return jsonify({'error': 'Unauthorized'}), HTTP_401_UNAUTHORIZED

    data = request.get_json()
    if not data:
        return jsonify({'error': 'No input data provided'}), HTTP_400_BAD_REQUEST

    adm = Admin.query.get(id)
    if not adm:
        return jsonify({'error': 'Admin not found'}), HTTP_404_NOT_FOUND

    # Only super admin can update other admins' role
    if current_admin.role != "super_admin" and current_admin.id != id:
        return jsonify({'error': 'Not authorized'}), HTTP_403_FORBIDDEN

    # Update name
    if 'name' in data and data['name'] != adm.name:
        if Admin.query.filter_by(name=data['name']).first():
            return jsonify({'error': 'Name already in use'}), HTTP_409_CONFLICT
        adm.name = data['name']

    # Update email
    if 'email' in data and data['email'] != adm.email:
        if not validators.email(data['email']):
            return jsonify({'error': 'Invalid email format'}), HTTP_400_BAD_REQUEST
        if Admin.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already in use'}), HTTP_409_CONFLICT
        adm.email = data['email']

    # Update password
    if 'password' in data and data['password']:
        adm.password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    # Update role (Super Admin only)
    if 'role' in data and current_admin.role == "super_admin":
        if data['role'] in ['admin', 'super_admin']:
            adm.role = data['role']

    db.session.commit()
    return jsonify({'message': 'Admin updated successfully'}), HTTP_200_OK

# -------------------------
# Delete admin
# -------------------------
@admin.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_admin(id):
    current_admin = Admin.query.get(get_jwt_identity())
    if not current_admin or current_admin.role != "super_admin":
        return jsonify({'error': 'Super admin only'}), HTTP_403_FORBIDDEN

    try:
        adm = Admin.query.get(id)
        if not adm:
            return jsonify({'error': 'Admin not found'}), HTTP_404_NOT_FOUND

        db.session.delete(adm)
        db.session.commit()
>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17
        return jsonify({'message': 'Admin deleted successfully'}), HTTP_200_OK

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR
<<<<<<< HEAD
    
=======
>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17
