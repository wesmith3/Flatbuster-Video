from config import (
    SerializerMixin, 
    metadata, 
    association_proxy, 
    validates,
    db)

class CartMovie(db.Model, SerializerMixin):
    __tablename__="cart_movies"
    
    id = db.Column(db.Integer, primary_key = True)
    cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'))
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))
    
    #Relationships
    cart = db.relationship('Cart', back_populates='cart_movies')
    movie = db.relationship('Movie', back_populates='cart_movies')
    
    
    #Serialization
    serialize_rules = ('-cart.cart_movies', '-movie.cart_movies')
    
    #Validations
    
    
    def __repr__(self):
        return f"<CartMovie Id:{self.id}, Movie ID:{self.movie_id}, Cart ID:{self.cart_id}>"