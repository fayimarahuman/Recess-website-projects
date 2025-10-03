from flask import Blueprint, request, jsonify
<<<<<<< HEAD
from app.models.customer import Customer
from app.models.admin import Admin
from app.status_codes import HTTP_401_UNAUTHORIZED, HTTP_500_INTERNAL_SERVER_ERROR,HTTP_400_BAD_REQUEST, HTTP_200_OK,HTTP_404_NOT_FOUND 
from app.models.product import Product
from flask_jwt_extended import jwt_required, get_jwt_identity 
from app.extensions import db

# Blueprint
product = Blueprint('product', __name__, url_prefix='/product')

# Creating product
@product.route('/create', methods=['POST'])
@jwt_required()
def create_product():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"message": "No input data provided"}), HTTP_400_BAD_REQUEST
        
        current_user_id = get_jwt_identity()
        current_admin = Admin.query.get(current_user_id)

        if not current_admin:
            return jsonify({"message": "Unauthorized user"}), HTTP_401_UNAUTHORIZED

        product = Product(
            name=data.get('name'),
            description=data.get('description', ''),
            stock=data.get('stock', 0)
        )

        db.session.add(product)
        db.session.commit()

        return jsonify({"message": "Product created successfully", "product_id": product.id}), HTTP_200_OK
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

# Get all products
=======
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.status_codes import (
    HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND, HTTP_500_INTERNAL_SERVER_ERROR
)
from app.models.admin import Admin
from app.models.product import Product
from app.models.category import Category

product = Blueprint('product', __name__, url_prefix='/product')

# -------------------------
# Create product
# -------------------------
@product.route('/create', methods=['POST'])
@jwt_required()
def create_product():
    data = request.get_json()
    if not data:
        return jsonify({"message": "No input data provided"}), HTTP_400_BAD_REQUEST

    current_admin = Admin.query.get(get_jwt_identity())
    if not current_admin or current_admin.role not in ['admin', 'super_admin']:
        return jsonify({"message": "Admins only"}), HTTP_401_UNAUTHORIZED

    category_id = data.get('category_id')
    if not category_id:
        return jsonify({"message": "category_id is required"}), HTTP_400_BAD_REQUEST

    category = Category.query.get(category_id)
    if not category:
        return jsonify({"message": "Category not found"}), HTTP_404_NOT_FOUND

    try:
        product_obj = Product(
            name=data.get('name'),
            description=data.get('description', ''),
            stock=data.get('stock', 0),
            category_id=category_id  # assign category here
        )
        db.session.add(product_obj)
        db.session.commit()

        return jsonify({
            "message": "Product created successfully",
            "product_id": product_obj.id,
            "category_id": product_obj.category_id
        }), HTTP_201_CREATED

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error creating product", "error": str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

# -------------------------
# Get all products
# -------------------------
>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17
@product.route('/get/all', methods=['GET'])
@jwt_required()
def get_all_products():
    try:
        all_products = Product.query.all()
<<<<<<< HEAD
        current_user_id = get_jwt_identity()
        current_customer = Customer.query.get(current_user_id)

        if not current_customer:
            return jsonify({'message': 'Unauthorized user'}), HTTP_401_UNAUTHORIZED
        
        if not all_products:
            return jsonify({'message': 'No products found'}), HTTP_404_NOT_FOUND
        
        product_list = []
        for product in all_products:
            product_info = {
                'id': product.id,
                'name': product.name,
                'description': product.description,
                'stock': product.stock,
            }
            product_list.append(product_info)
=======
        if not all_products:
            return jsonify({'message': 'No products found'}), HTTP_200_OK

        product_list = []
        for prod in all_products:
            product_list.append({
                'id': prod.id,
                'name': prod.name,
                'description': prod.description,
                'stock': prod.stock,
                'category_id': prod.category_id
            })
>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17

        return jsonify({'products': product_list}), HTTP_200_OK

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR
<<<<<<< HEAD
    

# Update product
=======

# -------------------------
# Update product
# -------------------------
>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17
@product.route('/update/<int:id>', methods=['PUT'])
@jwt_required()
def update_product(id):
    data = request.get_json()
<<<<<<< HEAD
    current_user_id = get_jwt_identity()
    current_admin = Admin.query.get(current_user_id)

    if not current_admin or not current_admin.is_admin:
        return jsonify({'error': 'Admins only'}), HTTP_401_UNAUTHORIZED
    
    if not data:
        return jsonify({'error': 'No input data provided'}), HTTP_400_BAD_REQUEST

    product = Product.query.get(id)
    if not product:
        return jsonify({'error': 'Product not found'}), HTTP_404_NOT_FOUND

    product.name = data.get('name', product.name)
    product.description = data.get('description', product.description)
    product.stock = data.get('stock', product.stock)

    db.session.commit()

    return jsonify({'message': 'Product updated successfully'}), HTTP_200_OK

# Delete product
@product.route('/delete/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_product(id):
    current_user_id = get_jwt_identity()
    current_admin = Admin.query.get(current_user_id)

    if not current_admin or not current_admin.is_admin:
        return jsonify({'error': 'Admins only'}), HTTP_401_UNAUTHORIZED

    product = Product.query.get(id)
    if not product:
        return jsonify({'error': 'Product not found'}), HTTP_404_NOT_FOUND

    db.session.delete(product)
    db.session.commit()

    return jsonify({'message': 'Product deleted successfully'}), HTTP_200_OK
    

=======
    if not data:
        return jsonify({'error': 'No input data provided'}), HTTP_400_BAD_REQUEST

    current_admin = Admin.query.get(get_jwt_identity())
    if not current_admin or current_admin.role not in ['admin', 'super_admin']:
        return jsonify({'error': 'Admins only'}), HTTP_401_UNAUTHORIZED

    product_obj = Product.query.get_or_404(id)
    product_obj.name = data.get('name', product_obj.name)
    product_obj.description = data.get('description', product_obj.description)
    product_obj.stock = data.get('stock', product_obj.stock)

    # Update category_id if provided
    category_id = data.get('category_id')
    if category_id:
        category = Category.query.get(category_id)
        if not category:
            return jsonify({"message": "Category not found"}), HTTP_404_NOT_FOUND
        product_obj.category_id = category_id

    db.session.commit()
    return jsonify({'message': 'Product updated successfully'}), HTTP_200_OK

# -------------------------
# Delete product
# -------------------------
@product.route('/delete/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_product(id):
    current_admin = Admin.query.get(get_jwt_identity())
    if not current_admin or current_admin.role not in ['admin', 'super_admin']:
        return jsonify({'error': 'Admins only'}), HTTP_401_UNAUTHORIZED

    product_obj = Product.query.get_or_404(id)
    db.session.delete(product_obj)
    db.session.commit()
    return jsonify({'message': 'Product deleted successfully'}), HTTP_200_OK
>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17
