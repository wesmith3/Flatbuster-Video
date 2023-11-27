from config import (
    SerializerMixin, 
    metadata, 
    association_proxy, 
    validates,
    db)

class User(db.Model, SerializerMixin):
    __tablename__='users'
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.Integer, nullable=False)
    address = db.Column(db.String, nullable=False)
    is_employee = db.Column(db.Boolean, nullable=False)
    
    #Relationships
    rentals = db.relationship(
        'Rental', 
        back_populates='user', 
        cascade='all, delete-orphan'
        )
    movies = association_proxy('rentals', 'movie')
    complaints = db.relationship('Complaint', back_populates='user', cascade='all, delete-orphan')
    
    #Serialization
    serialize_rules = ('-rentals.user', '-movies.users', '-complaints.user')
    
    #Validations
    
    
    def __repr__(self):
        return f"<User Id:{self.id}, Name:{self.first_name} {self.last_name}, Is Employed:{self.is_employee}>"