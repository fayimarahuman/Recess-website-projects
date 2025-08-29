from app import db
from datetime import datetime

class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, default='')
    stock = db.Column(db.Integer, default=0)
    
    # Category relationship
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    category = db.relationship('Category', backref=db.backref('products', lazy=True))

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __init__(self, name, description='', stock=0, category_id=None):
        if not category_id:
            raise ValueError("Product must have a category assigned")

        self.name = name
        self.description = description
        self.stock = stock
        self.category_id = category_id

    def __repr__(self):
        return f"<Product {self.name} (Stock: {self.stock}, Category ID: {self.category_id})>"
