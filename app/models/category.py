from app import db
<<<<<<< HEAD

class Category(db.Model):
=======
from datetime import datetime

class Category(db.Model):
    __tablename__ = 'categories'

>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.String(255))

<<<<<<< HEAD
def __init__(self, name, description):
        super(Category, self).__init__()
        self.name = name
        self.description = description

def category(self):
        return f'{self.name} {self.description}'
=======
    # Optional timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __init__(self, name, description=''):
        self.name = name
        self.description = description

    def __repr__(self):
        return f"<Category {self.name}>"
>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17
