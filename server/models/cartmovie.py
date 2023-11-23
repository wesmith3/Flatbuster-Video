from config import (
    SerializerMixin, 
    metadata, 
    association_proxy, 
    validates,
    db)

class CartMovie(db.Model, SerializerMixin):
    __tablename__='cart_movies'
    
    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'))
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))

    def __repr__(self):
        return f"<CartMovie {self.cart_id} {self.movie_id}>"
