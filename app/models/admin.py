from app import db

class Admin(db.Model):
    __tablename__ = 'admins'
<<<<<<< HEAD
=======
    
>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
<<<<<<< HEAD
    is_admin = db.Column(db.Boolean, default=True)
    role = db.Column(db.String(50), default='admin')

    def __init__(self, name, email, password, is_admin=True, role='admin'):
        super(Admin, self).__init__()
=======
    
    # Admin type
    is_admin = db.Column(db.Boolean, default=True)  # True for admin/super admin
    role = db.Column(db.String(50), default='admin')  # 'admin' or 'super_admin'
    
    # Optional timestamps
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    def __init__(self, name, email, password, is_admin=True, role='admin'):
>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17
        self.name = name
        self.email = email
        self.password = password
        self.is_admin = is_admin
        self.role = role

<<<<<<< HEAD
def __repr__(self):
    return f"{self.name}"
=======
    def __repr__(self):
        return f"<Admin {self.name} ({self.role})>"
>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17
