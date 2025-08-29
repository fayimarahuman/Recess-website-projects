from app import db

class Admin(db.Model):
    __tablename__ = 'admins'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    
    # Admin type
    is_admin = db.Column(db.Boolean, default=True)  # True for admin/super admin
    role = db.Column(db.String(50), default='admin')  # 'admin' or 'super_admin'
    
    # Optional timestamps
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    def __init__(self, name, email, password, is_admin=True, role='admin'):
        self.name = name
        self.email = email
        self.password = password
        self.is_admin = is_admin
        self.role = role

    def __repr__(self):
        return f"<Admin {self.name} ({self.role})>"
