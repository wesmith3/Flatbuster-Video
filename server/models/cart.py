from app_setup import (
    SerializerMixin, 
    metadata, 
    association_proxy, 
    validates,
    db)

class Cart(db.Model, SerializerMixin):
    __tablename__='carts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        return f"<Cart {self.id} {self.user_id}>"
