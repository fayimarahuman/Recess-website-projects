from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.status_codes import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND
from app.models.category import Category
from app.models.admin import Admin

# -------------------------
# Blueprint
# -------------------------
category = Blueprint('category', __name__, url_prefix='/categories')

# -------------------------
# Create category (Admin or Super Admin)
# -------------------------
@category.route('/create', methods=['POST'])
@jwt_required()
def create_category():
    data = request.get_json()
    if not data:
        return jsonify({'message': 'Invalid input'}), HTTP_400_BAD_REQUEST

    admin = Admin.query.get(get_jwt_identity())
    if not admin or admin.role not in ['admin', 'super_admin']:
        return jsonify({'message': 'Admins only'}), HTTP_401_UNAUTHORIZED

    try:
        new_category = Category(
            name=data.get('name'),
            description=data.get('description')
        )
        db.session.add(new_category)
        db.session.commit()

        return jsonify({'message': 'Category created', 'id': new_category.id}), HTTP_201_CREATED

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error creating category', 'error': str(e)}), HTTP_400_BAD_REQUEST

# -------------------------
# Get all categories
# -------------------------
@category.route('/all', methods=['GET'])
@jwt_required()
def get_all_categories():
    try:
        categories = Category.query.all()
        if not categories:
            return jsonify({'message': 'No categories found'}), HTTP_200_OK

        category_list = []
        for cat in categories:
            category_list.append({
                'id': cat.id,
                'name': cat.name,
                'description': cat.description
            })

        return jsonify({'categories': category_list}), HTTP_200_OK

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error fetching categories', 'error': str(e)}), HTTP_400_BAD_REQUEST

# -------------------------
# Update category
# -------------------------
@category.route('/update/<int:id>', methods=['PUT'])
@jwt_required()
def update_category(id):
    data = request.get_json()
    if not data:
        return jsonify({'message': 'Invalid input'}), HTTP_400_BAD_REQUEST

    admin = Admin.query.get(get_jwt_identity())
    if not admin or admin.role not in ['admin', 'super_admin']:
        return jsonify({'message': 'Admins only'}), HTTP_401_UNAUTHORIZED

    category_obj = Category.query.get_or_404(id)

    if 'name' in data:
        category_obj.name = data['name']
    if 'description' in data:
        category_obj.description = data['description']

    try:
        db.session.commit()
        return jsonify({'message': 'Category updated successfully', 'category': {
            'id': category_obj.id,
            'name': category_obj.name,
            'description': category_obj.description
        }}), HTTP_200_OK

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error updating category', 'error': str(e)}), HTTP_400_BAD_REQUEST

# -------------------------
# Delete category
# -------------------------
@category.route('/delete/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_category(id):
    admin = Admin.query.get(get_jwt_identity())
    if not admin or admin.role not in ['admin', 'super_admin']:
        return jsonify({'message': 'Admins only'}), HTTP_401_UNAUTHORIZED

    category_obj = Category.query.get_or_404(id)

    try:
        db.session.delete(category_obj)
        db.session.commit()
        return jsonify({'message': 'Category deleted successfully'}), HTTP_200_OK

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error deleting category', 'error': str(e)}), HTTP_400_BAD_REQUEST
