from config import (
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
    
    #Relationship
    user = db.relationship('User', back_populates='complaints')
    
    #Serialization
    # serialize_rules = ('-user.complaints',)
    serialize_only = ('id', 'description','user_id','user.first_name','user.last_name')

    def __repr__(self):
        return f"<Complaint Id:{self.id}, Comment:{self.description}>"
