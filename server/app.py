#!/usr/bin/env python3

# Standard library imports
from models.cart import Cart
from models.user import User
from models.movie import Movie
from models.rental import Rental
from models.review import Review
from models.complaint import Complaint
from models.stockrequest import StockRequest
from models.cartmovie import CartMovie
# Remote library imports
from flask import request, Flask
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports


# Views go here!

@app.route('/')
def index():
    return '<h1>Flatbuster Video Server</h1>'

class Users(Resource):
    def get(self):
        u_list = []
        users = User.query
        for user in users:
            u_list.append(user.to_dict())
        return u_list, 200
    
api.add_resource(Users, '/users')

class Movies(Resource):
    def get(self):
        m_list = []
        movies = Movie.query
        for movie in movies:
            m_list.append(movie.to_dict())
        return m_list, 200
    
api.add_resource(Movies, '/movies')

class Rentals(Resource):
    def get(self):
        r_list = []
        rentals = Rental.query
        for rental in rentals:
            r_list.append(rental.to_dict())
        return r_list, 200
    
api.add_resource(Rentals, '/rentals')

class Reviews(Resource):
    def get(self):
        r_list = []
        reviews = Review.query
        for review in reviews:
            r_list.append(review.to_dict())
        return r_list, 200
    
api.add_resource(Reviews, '/reviews')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

