from config import (
    SerializerMixin, 
    metadata, 
    association_proxy, 
    validates,
    db)


class Movie(db.Model, SerializerMixin):
    __tablename__='movies'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    genre = db.Column(db.String, nullable=False)
    release_year = db.Column(db.Integer, nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    
    #Relationships
    rentals = db.relationship(
        'Rental', back_populates='movie', cascade='all, delete-orphan'
        )
    users = association_proxy('rentals', 'user')
    
    #Serialization
    serialize_rules = ('-rentals.movie', '-users.movies')
    
    #Validations
    
    
    def __repr__(self):
        return f"<Movie Id:{self.id}, Title:{self.title}, Genre:{self.genre}, YearReleased:{self.release_year}  >"
