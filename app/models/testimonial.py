from app import db
<<<<<<< HEAD

class Testimonial(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

def __init__(self, customer_name, content, created_at):
        super(Testimonial, self).__init__()
        self.customer_name = customer_name
        self.content = content
        self.created_at = created_at
##change def
def get_full_name(self):
        return f'{self.customer_name} {self.content}'
=======
from datetime import datetime

class Testimonial(db.Model):
    __tablename__ = 'testimonials'

    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __init__(self, customer_name, content):
        self.customer_name = customer_name
        self.content = content

    def __repr__(self):
        return f"<Testimonial from {self.customer_name}>"
>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17
