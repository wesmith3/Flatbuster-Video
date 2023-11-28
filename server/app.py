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
from flask import request, Flask, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


class Users(Resource):
    def get(self):
        u_list = []
        users = User.query
        for user in users:
            u_list.append(user)
        return make_response(u_list.to_dict(), 200)
    
api.add_resource(Users, '/users')

class Movies(Resource):
    def get(self):
        movie_list = []
        movies = Movie.query
        for movie in movies:
            movie_list.append(movie.to_dict())
        return movie_list, 200
    
api.add_resource(Movies, '/movies')

class Complaints(Resource):
    def get(self):
        c_list = []
        complaints = Complaint.query
        for complaint in complaints:
            c_list.append(complaint.to_dict())
        return c_list, 200
    
api.add_resource(Complaints, '/complaints')

class StockRequests(Resource):
    def get(self):
        sr_list = []
        stock_requests = StockRequest.query
        for stock_request in stock_requests:
            sr_list.append(stock_request.to_dict())
        return sr_list, 200
    
api.add_resource(StockRequests, '/stockrequests')

class Carts(Resource):
    def get(self):
        c_list = []
        carts = Cart.query
        for cart in carts:
            c_list.append(cart.to_dict(rules=(
                '-movies.rentals',
            )))
        return c_list, 200
    
api.add_resource(Carts, '/carts')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

