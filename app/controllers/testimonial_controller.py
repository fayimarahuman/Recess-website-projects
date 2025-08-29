from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db
from app.models.admin import Admin
from app.models.testimonial import Testimonial
from app.status_codes import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND, HTTP_500_INTERNAL_SERVER_ERROR

# -------------------------
# Blueprint
# -------------------------
testimonial = Blueprint('testimonial', __name__, url_prefix='/testimonial')

# -------------------------
# Helper function to check admin
# -------------------------
def is_admin():
    current_user_id = get_jwt_identity()
    admin = Admin.query.get(current_user_id)
    if not admin or admin.role not in ['admin', 'super_admin']:
        return None
    return admin

# -------------------------
# Create testimonial
# -------------------------
@testimonial.route('/create', methods=['POST'])
@jwt_required()
def create_testimonial():
    try:
        current_admin = is_admin()
        if not current_admin:
            return jsonify({'message': 'Admins only'}), HTTP_401_UNAUTHORIZED

        data = request.get_json()
        if not data:
            return jsonify({"message": "No input data provided"}), HTTP_400_BAD_REQUEST

        testimonial_obj = Testimonial(
            customer_name=data.get('customer_name'),
            content=data.get('content', '')
        )
        db.session.add(testimonial_obj)
        db.session.commit()

        return jsonify({"message": "Testimonial created successfully", "testimonial_id": testimonial_obj.id}), HTTP_201_CREATED
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

# -------------------------
# Get all testimonials
# -------------------------
@testimonial.route('/all', methods=['GET'])
@jwt_required()
def get_all_testimonials():
    try:
        testimonials = Testimonial.query.all()
        testimonial_list = [
            {
                "id": t.id,
                "customer_name": t.customer_name,
                "content": t.content
            } for t in testimonials
        ]
        return jsonify({'testimonials': testimonial_list}), HTTP_200_OK
    except Exception as e:
        return jsonify({"message": str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

# -------------------------
# Update testimonial
# -------------------------
@testimonial.route('/update/<int:id>', methods=['PUT'])
@jwt_required()
def update_testimonial(id):
    try:
        current_admin = is_admin()
        if not current_admin:
            return jsonify({'message': 'Admins only'}), HTTP_401_UNAUTHORIZED

        testimonial_obj = Testimonial.query.get(id)
        if not testimonial_obj:
            return jsonify({'message': 'Testimonial not found'}), HTTP_404_NOT_FOUND

        data = request.get_json()
        if not data:
            return jsonify({"message": "No input data provided"}), HTTP_400_BAD_REQUEST

        testimonial_obj.customer_name = data.get('customer_name', testimonial_obj.customer_name)
        testimonial_obj.content = data.get('content', testimonial_obj.content)

        db.session.commit()
        return jsonify({'message': 'Testimonial updated successfully'}), HTTP_200_OK
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

# -------------------------
# Delete testimonial
# -------------------------
@testimonial.route('/delete/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_testimonial(id):
    try:
        current_admin = is_admin()
        if not current_admin:
            return jsonify({'message': 'Admins only'}), HTTP_401_UNAUTHORIZED

        testimonial_obj = Testimonial.query.get(id)
        if not testimonial_obj:
            return jsonify({'message': 'Testimonial not found'}), HTTP_404_NOT_FOUND

        db.session.delete(testimonial_obj)
        db.session.commit()
        return jsonify({'message': 'Testimonial deleted successfully'}), HTTP_200_OK
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), HTTP_500_INTERNAL_SERVER_ERROR
