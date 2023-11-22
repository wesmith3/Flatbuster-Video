from app_setup import *

class Movie(db.Model, SerializerMixin):
    __tablename__='movies'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    genre = db.Column(db.String, nullable=False)
    release_year = db.Column(db.DateTime, nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    create_at = db.Column(db.DateTime, server_default = db.func.now(), nullable=False)
    updated_at = db.Column(db.DateTime,onupdate = db.func.now(), nullable=False)
    
    def __repr__(self):
        return f"<User {self.id} {self.title} {self.genre} year released:{self.release_year}>"
