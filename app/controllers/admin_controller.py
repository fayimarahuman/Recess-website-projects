from flask import Blueprint, request, jsonify
from app.status_codes import (
    HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_403_FORBIDDEN,
    HTTP_500_INTERNAL_SERVER_ERROR, HTTP_200_OK, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT
)
import validators
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.admin import Admin
from app.extensions import db, bcrypt

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

    try:
        all_admins = Admin.query.all()
        if not all_admins:
            return jsonify({'message': 'No admins found'}), HTTP_404_NOT_FOUND

        admin_list = []
        for adm in all_admins:
            admin_list.append({
                'id': adm.id,
                'name': adm.name,
                'email': adm.email,
                'role': adm.role
            })

        return jsonify({'admins': admin_list}), HTTP_200_OK

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

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

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

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
        return jsonify({'message': 'Admin deleted successfully'}), HTTP_200_OK

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR
