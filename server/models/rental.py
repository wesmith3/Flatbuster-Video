from config import (
    SerializerMixin, 
    metadata, 
    association_proxy, 
    validates,
    db)

class Rental(db.Model, SerializerMixin):
    __tablename__="rentals"
    
    id = db.Column(db.Integer, primary_key = True)
    rental_date = db.Column(db.DateTime, nullable=False)
    return_date = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))
    
    #Relationships
    user = db.relationship('User', back_populates='rentals')
    movie = db.relationship('Movie', back_populates='rentals')
    reviews = db.relationship('Review', back_populates='rental', cascade='all, delete-orphan')
    
    #Serialization
    serialize_rules = ('-user.rentals', '-movie.rentals', '-reviews.rental')
    
    #Validations
    
    
    def __repr__(self):
        return f"<Rental Id:{self.id}, Rental Date:{self.rental_date}, Return Date:{self.return_date} >"