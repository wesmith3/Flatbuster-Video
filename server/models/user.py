from app_setup import (
    SerializerMixin, 
    metadata, 
    association_proxy, 
    validates,
    db)

class User(db.Model, SerializerMixin):
    __tablename__='users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.Integer, nullable=False)
    address = db.Column(db.String, nullable=False)
    is_employee = db.Column(db.Boolean, nullable=False)
    
    def __repr__(self):
        return f"<User {self.id}, {self.first_name} {self.last_name} Is Employed:{self.is_employee}>"