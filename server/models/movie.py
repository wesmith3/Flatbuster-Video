from app_setup import (
    SerializerMixin, 
    metadata, 
    association_proxy, 
    validates,
    db)

class Movie(db.Model, SerializerMixin):
    __tablename__='movies'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    genre = db.Column(db.String, nullable=False)
    release_year = db.Column(db.DateTime, nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    create_at = db.Column(db.DateTime, server_default = db.func.now(), nullable=False)
    updated_at = db.Column(db.DateTime, onupdate = db.func.now(), nullable=False)
    
    #Relationships
    rentals = db.relationship(
        'Rentals', back_populates='movie', cascade='all, delete-orphan'
        )
    users = association_proxy('rentals', 'user')
    
    #Serialization
    
    
    #Validations
    
    
    def __repr__(self):
        return f"<Movie {self.id} {self.title} {self.genre} Year Released:{self.release_year}>"
