from app_setup import (
    SerializerMixin, 
    metadata, 
    association_proxy, 
    validates,
    db)

class Complaint(db.Model, SerializerMixin):
    __tablename__='complaints'
    
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))


    def __repr__(self):
        return f"<Complaint {self.id} {self.description}>"
