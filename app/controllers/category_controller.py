from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
<<<<<<< HEAD
from app.status_codes import HTTP_200_OK, HTTP_201_CREATED,HTTP_400_BAD_REQUEST,HTTP_401_UNAUTHORIZED
from app.models.category import Category
from app.models.admin import Admin

category = Blueprint('category', __name__, url_prefix='/categories')

#creating category
=======
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
>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17
@category.route('/create', methods=['POST'])
@jwt_required()
def create_category():
    data = request.get_json()
<<<<<<< HEAD

    if not data:
        return jsonify({'message': 'Invalid input'}), HTTP_400_BAD_REQUEST

    admin = Admin.query.filter_by(id=get_jwt_identity()).first()
    
    if admin.role != 'admin':
        return jsonify({'message': 'Only admins can create categories'}), HTTP_401_UNAUTHORIZED

    try:
        category = Category(
            name=data.get('name'),
            description=data.get('description')
        )
        db.session.add(category)
        db.session.commit()

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error creating category', 'error': str(e)}), HTTP_400_BAD_REQUEST
    return jsonify({'message': 'Category created', 'id': category.id}), HTTP_201_CREATED


#getting categories
=======
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
>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17
@category.route('/all', methods=['GET'])
@jwt_required()
def get_all_categories():
    try:
        categories = Category.query.all()
        if not categories:
            return jsonify({'message': 'No categories found'}), HTTP_200_OK
<<<<<<< HEAD
        
        current_user_id = get_jwt_identity()
        current_admin = Admin.query.get(current_user_id)

        if not current_admin or not current_admin.is_admin:
            return jsonify({'error': 'Admins only'}), HTTP_401_UNAUTHORIZED

        category_list = []
        for category in categories:
            category_info = {
                'id': category.id,
                'name': category.name,
                'description': category.description
            }
            category_list.append(category_info)
=======

        category_list = []
        for cat in categories:
            category_list.append({
                'id': cat.id,
                'name': cat.name,
                'description': cat.description
            })
>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17

        return jsonify({'categories': category_list}), HTTP_200_OK

    except Exception as e:
        db.session.rollback()
<<<<<<< HEAD
        return jsonify({'error': str(e)}), HTTP_400_BAD_REQUEST


#updating category
=======
        return jsonify({'message': 'Error fetching categories', 'error': str(e)}), HTTP_400_BAD_REQUEST

# -------------------------
# Update category
# -------------------------
>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17
@category.route('/update/<int:id>', methods=['PUT'])
@jwt_required()
def update_category(id):
    data = request.get_json()
    if not data:
        return jsonify({'message': 'Invalid input'}), HTTP_400_BAD_REQUEST
<<<<<<< HEAD
    
    current_user_id = get_jwt_identity()
    current_admin = Admin.query.get(current_user_id)

    if not current_admin or not current_admin.is_admin:
        return jsonify({'message': 'Only admins can update categories'}), HTTP_401_UNAUTHORIZED

    category = Category.query.get_or_404(id)

    if 'name' in data:
        category.name = data['name']
    if 'description' in data:
        category.description = data['description']
=======

    admin = Admin.query.get(get_jwt_identity())
    if not admin or admin.role not in ['admin', 'super_admin']:
        return jsonify({'message': 'Admins only'}), HTTP_401_UNAUTHORIZED

    category_obj = Category.query.get_or_404(id)

    if 'name' in data:
        category_obj.name = data['name']
    if 'description' in data:
        category_obj.description = data['description']
>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17

    try:
        db.session.commit()
        return jsonify({'message': 'Category updated successfully', 'category': {
<<<<<<< HEAD
            'id': category.id,
            'name': category.name,
            'description': category.description
        }}), HTTP_200_OK
=======
            'id': category_obj.id,
            'name': category_obj.name,
            'description': category_obj.description
        }}), HTTP_200_OK

>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error updating category', 'error': str(e)}), HTTP_400_BAD_REQUEST

<<<<<<< HEAD
#deleting category
@category.route('/delete/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_category(id):
    current_user_id = get_jwt_identity()
    current_admin = Admin.query.get(current_user_id)

    if not current_admin or not current_admin.is_admin:
        return jsonify({'message': 'Only admins can delete categories'}), HTTP_401_UNAUTHORIZED

    category = Category.query.get_or_404(id)

    try:
        db.session.delete(category)
        db.session.commit()
        return jsonify({'message': 'Category deleted successfully'}), HTTP_200_OK
=======
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

>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error deleting category', 'error': str(e)}), HTTP_400_BAD_REQUEST
