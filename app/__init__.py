from flask import Flask
from app.extensions import db, migrate, jwt, bcrypt
from app.controllers.auth_controller import auth
from app.controllers.admin_controller import admin
from app.controllers.category_controller import category
from app.controllers.product_controller import product
from app.controllers.testimonial_controller import testimonial

# Application factory
def create_app():
    app = Flask(__name__)
    app.config.from_object("config.Config")

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)

    # Import models so Flask-Migrate knows about them
    from app.models.admin import Admin
    from app.models.category import Category
    from app.models.product import Product
    from app.models.testimonial import Testimonial

    # Register blueprints
    app.register_blueprint(auth)
    app.register_blueprint(admin)
    app.register_blueprint(category)
    app.register_blueprint(product)
    app.register_blueprint(testimonial)

    # Index route
    @app.route('/')
    def index():
        return "Welcome to CAROLINE WAYS LTD backend design"

    return app  # only return the app instance
