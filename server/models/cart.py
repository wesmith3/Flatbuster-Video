from config import (
    SerializerMixin, 
    metadata, 
    association_proxy, 
    validates,
    db)

class Cart(db.Model, SerializerMixin):
    __tablename__='carts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))

#relationship

    user = db.relationship('User', back_populates='cart')
    cart_movies = db.relationship('CartMovie',back_populates='cart', cascade='all, delete-orphan')
    movies = association_proxy('cart_movies', 'movie')
#serialization
    # serialize_rules=('-user.cart','-movies.carts','-cart_movies.cart')
    serialize_only = ('id','user_id', 'movie_id','cart_movies.id','movies.title')
    
    def __repr__(self):
        return f"<Cart {self.id} {self.user_id}>"
