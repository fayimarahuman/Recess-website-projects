from flask import Flask
from flask_cors import CORS
from app.extensions import db, migrate, jwt, bcrypt
from app.controllers.auth_controller import auth
from app.controllers.admin_controller import admin
from app.controllers.customer_controller import customer
from app.controllers.category_controller import category
from app.controllers.product_controller import product
from app.controllers.inquiry_controller import inquiry
from app.controllers.testimonial_controller import testimonial

def create_app():
    app = Flask(__name__)
    app.config.from_object("config.Config")

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)

    # Setup CORS to allow requests from React frontend
    CORS(app, resources={r"/auth/*": {"origins": ["http://localhost:3000"]}}, supports_credentials=True)
    CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000"]}}, supports_credentials=True)

    # Register models (optional but good practice)
    from app.models.admin import Admin
    from app.models.customer import Customer
    from app.models.category import Category
    from app.models.product import Product
    from app.models.inquiry import Inquiry
    from app.models.testimonial import Testimonial

    # Register blueprints
    app.register_blueprint(auth)
    app.register_blueprint(admin)
    app.register_blueprint(customer)
    app.register_blueprint(category)
    app.register_blueprint(product)
    app.register_blueprint(inquiry)
    app.register_blueprint(testimonial)

    # Simple index route
    @app.route('/')
    def index():
        return "Welcome to CAROLINE WAYS LTD backend design"

    return app
