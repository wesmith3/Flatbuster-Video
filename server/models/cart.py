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
    movies = db.relationship('Movie',back_populates='carts')
#serialization
    serialize_rules=('-user.cart','-movies.carts')
    
    def __repr__(self):
        return f"<Cart {self.id} {self.user_id}>"
