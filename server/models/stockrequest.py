from app_setup import (
    SerializerMixin, 
    metadata, 
    association_proxy, 
    validates,
    db)

class StockRequest(db.Model, SerializerMixin):
    __tablename__='stock_requests'
    
    id = db.Column(db.Integer, primary_key=True)
    request_date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))
    
    def __repr__(self):
        return f"<StockRequest {self.id} {self.request_date} {self.status}>"
