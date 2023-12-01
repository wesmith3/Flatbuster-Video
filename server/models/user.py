from config import (
    SerializerMixin, 
    metadata, 
    association_proxy, 
    validates,
    db,
    flask_bcrypt)
from sqlalchemy.ext.hybrid import hybrid_property

class User(db.Model, SerializerMixin):
    __tablename__='users'
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    is_employee = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    jwt = db.Column(db.String)

    @hybrid_property
    def password(self):
        raise AttributeError("Passwords are private")
    
    @password.setter
    def password(self, new_password):
        pw_hash = flask_bcrypt.generate_password_hash(new_password).decode("utf-8")
        self._password = pw_hash
    
    def verify(self, password_to_be_checked):
        return flask_bcrypt.check_password_hash(self._password, password_to_be_checked)
    
    def verify_jwt(self, jwt_to_be_checked):
        return self.jwt == jwt_to_be_checked
    
    
    #Relationships
    rentals = db.relationship(
        'Rental', 
        back_populates='user', 
        cascade='all, delete-orphan'
        )
    complaints = db.relationship(
        'Complaint',
        back_populates='user',
        cascade='all, delete-orphan'
        )
    cart = db.relationship(
        "Cart",
        back_populates='user',
        cascade='all, delete-orphan'
        )
    stock_requests=db.relationship(
        'StockRequest',
        back_populates='user',
        cascade='all, delete-orphan'
        )
    # movies = association_proxy('rentals', 'movie')

    #Serialization
    serialize_only = (
        'id',
        'first_name',
        'last_name',
        'email',
        'password',
        'phone_number',
        'address',
        'is_employee',
        'jwt'
        # 'rentals.id',
        # 'rentals.rental_date',
        # 'rentals.return_date',
        # 'rentals.movie_id',
        # 'complaints.id',
        # 'complaints.description',
        # 'cart.id',
        # 'stock_requests.id',
        # 'stock_requests.movie_id',
        # 'stock_requests.request_date',
        # 'stock_requests.status'
        )
    
    #Validations

    
    
    def __repr__(self):
        return f"<User Id:{self.id}, Name:{self.first_name} {self.last_name}, Is Employed:{self.is_employee}>"