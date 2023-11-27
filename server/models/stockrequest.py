from config import (
    SerializerMixin, 
    metadata, 
    association_proxy, 
    validates,
    db)

class StockRequest(db.Model, SerializerMixin):
    __tablename__='stock_requests'
    
    id = db.Column(db.Integer, primary_key=True)
    request_date = db.Column(db.DateTime)
    status = db.Column(db.Boolean)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))
    
    #relationship
    user = db.relationship('User', back_populates='stock_requests')
    movie = db.relationship('Movie', back_populates='stock_requests')
    
    #serialization
    serialize_rules=('-user.stock_requests', '-movie.stock_requests')
    
    def __repr__(self):
        return f"<StockRequest {self.id} {self.request_date} {self.status}>"
