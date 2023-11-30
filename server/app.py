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
import json

# Local imports
from config import app, db, api, flask_bcrypt
# Add your model imports


# Views go here!

@app.route('/')
def index():
    return '<h1>Flatbuster Video Server</h1>'



class Carts(Resource):
    def get(self):
        try:
            c_list = []
            carts = Cart.query
            for cart in carts:
                c_list.append(cart.to_dict())
            return make_response(c_list, 200)
        except (ValueError, AttributeError, TypeError) as e:
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
    def post(self):
        try:
            data = json.loads(request.data)
            new_cart = Cart(
                user_id = data["user_id"]
            )
            db.session.add(new_cart)
            db.session.commit()
            return make_response(new_cart.to_dict(), 201)
        except (ValueError, AttributeError, TypeError) as e:
            db.session.rollback()
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
api.add_resource(Carts, '/carts')

class CartByUserID(Resource):
    def get(self, user_id):
        try:
            cart = Cart.query.filter_by(user_id=user_id).first()
            if cart:
                return make_response(cart.to_dict(), 200)
            else:
                return make_response(
                    {"errors": "Cart Not Found"}, 404
                )
        except (ValueError, AttributeError, TypeError) as e:
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
    def patch(self, user_id):
        try:
            cart = db.session.get(Cart, user_id)
            if cart:
                data = json.loads(request.data)
                for attr in data:
                    setattr(cart, attr, data[attr])
                db.session.add(cart)
                db.session.commit()
                return make_response(cart.to_dict(), 200)
            else:
                return make_response(
                    {"errors": "Update unsuccessful"}, 400
                )
        except (ValueError, AttributeError, TypeError) as e:
            db.session.rollback()
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
    def delete(self,user_id):
        try:
            cart = db.session.get(Cart, user_id)
            if cart:
                db.session.delete(cart)
                db.session.commit()
                return make_response({}, 204)
            else:
                return make_response(
                    {"errors": "Delete unsuccessful"}, 400
                )
        except (ValueError, AttributeError, TypeError) as e:
            db.session.rollback()
            return make_response(
                {"errors": [str(e)]}, 400
            )
        
api.add_resource(CartByUserID, '/users/<int:user_id>/my_cart')



class CartMovies(Resource):
    def get(self):
        try:
            cm_list = []
            cart_movies = CartMovie.query
            for cart_movie in cart_movies:
                cm_list.append(cart_movie.to_dict())
            return make_response(cm_list, 200)
        except (ValueError, AttributeError, TypeError) as e:
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
    def post(self):
        try:
            data = json.loads(request.data)
            new_cart_movie = CartMovie(
                cart_id = data["cart_id"],
                movie_id = data["movie_id"],
            )
            db.session.add(new_cart_movie)
            db.session.commit()
            return make_response(new_cart_movie.to_dict(), 201)
        except (ValueError, AttributeError, TypeError) as e:
            db.session.rollback()
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
api.add_resource(CartMovies, '/cart_movies')

class CartMovieByID(Resource):
    def get(self, id):
        try:
            cart_movie = db.session.get(CartMovie, id)
            if cart_movie:
                return make_response(cart_movie.to_dict(), 200)
            else:
                return make_response(
                    {"errors": "Cart-Movie Not Found"}, 404
                )
        except (ValueError, AttributeError, TypeError) as e:
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
    def patch(self, id):
        try:
            cart_movie = db.session.get(CartMovie, id)
            if cart_movie:
                data = json.loads(request.data)
                for attr in data:
                    setattr(cart_movie, attr, data[attr])
                db.session.add(cart_movie)
                db.session.commit()
                return make_response(cart_movie.to_dict(), 200)
            else:
                return make_response(
                    {"errors": "Update unsuccessful"}, 400
                )
        except (ValueError, AttributeError, TypeError) as e:
            db.session.rollback()
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
    def delete(self,id):
        try:
            cart_movie = db.session.get(CartMovie, id)
            if cart_movie:
                db.session.delete(cart_movie)
                db.session.commit()
                return make_response({}, 204)
            else:
                return make_response(
                    {"errors": "Delete unsuccessful"}, 400
                )
        except (ValueError, AttributeError, TypeError) as e:
            db.session.rollback()
            return make_response(
                {"errors": [str(e)]}, 400
            )
        
api.add_resource(CartMovieByID, '/cart_movies/<int:id>')



class Complaints(Resource):
    def get(self):
        try:
            c_list = []
            complaints = Complaint.query
            for complaint in complaints:
                c_list.append(complaint.to_dict())
            return make_response(c_list, 200)
        except (ValueError, AttributeError, TypeError) as e:
            return make_response(
                {"errors": [str(e)]}, 400
            )
        
    def post(self):
        try:
            data = json.loads(request.data)
            new_complaint = Complaint(
                user_id = data["user_id"],
                description = data["description"]
            )
            db.session.add(new_complaint)
            db.session.commit()
            return make_response(new_complaint.to_dict(), 201)
        except (ValueError, AttributeError, TypeError) as e:
            db.session.rollback()
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
api.add_resource(Complaints, '/complaints')

class ComplaintByID(Resource):
    def get(self, id):
        try:
            complaint = db.session.get(Complaint, id)
            if complaint:
                return make_response(complaint.to_dict(), 200)
            else:
                return make_response(
                    {"errors": "Complaint Not Found"}, 404
                )
        except (ValueError, AttributeError, TypeError) as e:
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
    def patch(self, id):
        try:
            complaint = db.session.get(Complaint, id)
            if complaint:
                data = json.loads(request.data)
                for attr in data:
                    setattr(complaint, attr, data[attr])
                db.session.add(complaint)
                db.session.commit()
                return make_response(complaint.to_dict(), 200)
            else:
                return make_response(
                    {"errors": "Update unsuccessful"}, 400
                )
        except (ValueError, AttributeError, TypeError) as e:
            db.session.rollback()
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
    def delete(self,id):
        try:
            complaint = db.session.get(Complaint, id)
            if complaint:
                db.session.delete(complaint)
                db.session.commit()
                return make_response({}, 204)
            else:
                return make_response(
                    {"errors": "Delete unsuccessful"}, 400
                )
        except (ValueError, AttributeError, TypeError) as e:
            db.session.rollback()
            return make_response(
                {"errors": [str(e)]}, 400
            )
        
api.add_resource(ComplaintByID, '/complaints/<int:id>')



class Movies(Resource):
    def get(self):
        try:
            m_list = []
            movies = Movie.query
            for movie in movies:
                m_list.append(movie.to_dict())
            return make_response(m_list, 200)
        except (ValueError, AttributeError, TypeError) as e:
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
    def post(self):
        try:
            data = json.loads(request.data)
            new_movie = Movie(
                title = data["title"],
                genre = data["genre"],
                release_year = data["release_year"],
                stock = data["stock"]
            )
            db.session.add(new_movie)
            db.session.commit()
            return make_response(new_movie.to_dict(), 201)
        except (ValueError, AttributeError, TypeError) as e:
            db.session.rollback()
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
api.add_resource(Movies, '/movies')

class MovieByID(Resource):
    def get(self, id):
        try:
            movie = db.session.get(Movie, id)
            if movie:
                return make_response(movie.to_dict(), 200)
            else:
                return make_response(
                    {"errors": "Movie Not Found"}, 404
                )
        except (ValueError, AttributeError, TypeError) as e:
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
    def patch(self, id):
        try:
            movie = db.session.get(Movie, id)
            if movie:
                data = json.loads(request.data)
                for attr in data:
                    setattr(movie, attr, data[attr])
                db.session.add(movie)
                db.session.commit()
                return make_response(movie.to_dict(), 200)
            else:
                return make_response(
                    {"errors": "Update unsuccessful"}, 400
                )
        except (ValueError, AttributeError, TypeError) as e:
            db.session.rollback()
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
    def delete(self,id):
        try:
            movie = db.session.get(Movie, id)
            if movie:
                db.session.delete(movie)
                db.session.commit()
                return make_response({}, 204)
            else:
                return make_response(
                    {"errors": "Delete unsuccessful"}, 400
                )
        except (ValueError, AttributeError, TypeError) as e:
            db.session.rollback()
            return make_response(
                {"errors": [str(e)]}, 400
            )
        
api.add_resource(MovieByID, '/movies/<int:id>')



class Rentals(Resource):
    def get(self):
        try:
            r_list = []
            rentals = Rental.query
            for rental in rentals:
                r_list.append(rental.to_dict())
            return make_response(r_list, 200)
        except (ValueError, AttributeError, TypeError) as e:
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
    def post(self):
        try:
            data = json.loads(request.data)
            new_rental = Rental(
                rental_date = data["rental_date"],
                return_date = data["return_date"],
                user_id = data["user_id"],
                movie_id = data["movie_id"]
            )
            db.session.add(new_rental)
            db.session.commit()
            return make_response(new_rental.to_dict(), 201)
        except (ValueError, AttributeError, TypeError) as e:
            db.session.rollback()
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
api.add_resource(Rentals, '/rentals')

class RentalByID(Resource):
    def get(self, id):
        try:
            rental = db.session.get(Rental, id)
            if rental:
                return make_response(rental.to_dict(), 200)
            else:
                return make_response(
                    {"errors": "Rental Not Found"}, 404
                )
        except (ValueError, AttributeError, TypeError) as e:
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
    def patch(self, id):
        try:
            rental = db.session.get(Rental, id)
            if rental:
                data = json.loads(request.data)
                for attr in data:
                    setattr(rental, attr, data[attr])
                db.session.add(rental)
                db.session.commit()
                return make_response(rental.to_dict(), 200)
            else:
                return make_response(
                    {"errors": "Update unsuccessful"}, 400
                )
        except (ValueError, AttributeError, TypeError) as e:
            db.session.rollback()
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
    def delete(self,id):
        try:
            rental = db.session.get(Rental, id)
            if rental:
                db.session.delete(rental)
                db.session.commit()
                return make_response({}, 204)
            else:
                return make_response(
                    {"errors": "Delete unsuccessful"}, 400
                )
        except (ValueError, AttributeError, TypeError) as e:
            db.session.rollback()
            return make_response(
                {"errors": [str(e)]}, 400
            )
        
api.add_resource(RentalByID, '/rentals/<int:id>')



class Reviews(Resource):
    def get(self):
        try:
            r_list = []
            reviews = Review.query
            for review in reviews:
                r_list.append(review.to_dict())
            return make_response(r_list, 200)
        except (ValueError, AttributeError, TypeError) as e:
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
    def post(self):
        try:
            data = json.loads(request.data)
            new_review = Review(
                comment = data["comment"],
                rating = data["rating"],
                date = data["date"],
                rental_id = data["rental_id"],
            )
            db.session.add(new_review)
            db.session.commit()
            return make_response(new_review.to_dict(), 201)
        except (ValueError, AttributeError, TypeError) as e:
            db.session.rollback()
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
api.add_resource(Reviews, '/reviews')

class ReviewByID(Resource):
    def get(self, id):
        try:
            review = db.session.get(Review, id)
            if review:
                return make_response(review.to_dict(), 200)
            else:
                return make_response(
                    {"errors": "Review Not Found"}, 404
                )
        except (ValueError, AttributeError, TypeError) as e:
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
    def patch(self, id):
        try:
            review = db.session.get(Review, id)
            if review:
                data = json.loads(request.data)
                for attr in data:
                    setattr(review, attr, data[attr])
                db.session.add(review)
                db.session.commit()
                return make_response(review.to_dict(), 200)
            else:
                return make_response(
                    {"errors": "Update unsuccessful"}, 400
                )
        except (ValueError, AttributeError, TypeError) as e:
            db.session.rollback()
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
    def delete(self,id):
        try:
            review = db.session.get(Review, id)
            if review:
                db.session.delete(review)
                db.session.commit()
                return make_response({}, 204)
            else:
                return make_response(
                    {"errors": "Delete unsuccessful"}, 400
                )
        except (ValueError, AttributeError, TypeError) as e:
            db.session.rollback()
            return make_response(
                {"errors": [str(e)]}, 400
            )
        
api.add_resource(ReviewByID, '/reviews/<int:id>')



class StockRequests(Resource):
    def get(self):
        try:
            sr_list = []
            stock_requests = StockRequest.query
            for stock_request in stock_requests:
                sr_list.append(stock_request.to_dict())
            return make_response(sr_list, 200)
        except (ValueError, AttributeError, TypeError) as e:
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
    def post(self):
        try:
            data = json.loads(request.data)
            new_stock_request = StockRequest(
                request_date = data["request_date"],
                status = data["status"],
                user_id = data["user_id"],
                movie_id = data["movie_id"]
            )
            db.session.add(new_stock_request)
            db.session.commit()
            return make_response(new_stock_request.to_dict(), 201)
        except (ValueError, AttributeError, TypeError) as e:
            db.session.rollback()
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
api.add_resource(StockRequests, '/stock_requests')

class StockRequestByID(Resource):
    def get(self, id):
        try:
            stock_request = db.session.get(StockRequest, id)
            if stock_request:
                return make_response(stock_request.to_dict(), 200)
            else:
                return make_response(
                    {"errors": "Stock-Request Not Found"}, 404
                )
        except (ValueError, AttributeError, TypeError) as e:
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
    def patch(self, id):
        try:
            stock_request = db.session.get(StockRequest, id)
            if stock_request:
                data = json.loads(request.data)
                for attr in data:
                    setattr(stock_request, attr, data[attr])
                db.session.add(stock_request)
                db.session.commit()
                return make_response(stock_request.to_dict(), 200)
            else:
                return make_response(
                    {"errors": "Update unsuccessful"}, 400
                )
        except (ValueError, AttributeError, TypeError) as e:
            db.session.rollback()
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
    def delete(self,id):
        try:
            stock_request = db.session.get(StockRequest, id)
            if stock_request:
                db.session.delete(stock_request)
                db.session.commit()
                return make_response({}, 204)
            else:
                return make_response(
                    {"errors": "Delete unsuccessful"}, 400
                )
        except (ValueError, AttributeError, TypeError) as e:
            db.session.rollback()
            return make_response(
                {"errors": [str(e)]}, 400
            )
        
api.add_resource(StockRequestByID, '/stock_requests/<int:id>')



class Users(Resource):
    def get(self):
        try:
            u_list = []
            users = User.query
            for user in users:
                u_list.append(user.to_dict(rules=('-password',)))
            return make_response(u_list, 200)
        except (ValueError, AttributeError, TypeError) as e:
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
    def post(self):
        try:
            data = json.loads(request.data)
            pw_hash = flask_bcrypt.generate_password_hash(data["password"])
            new_user = User(
                first_name = data["first_name"],
                last_name = data["last_name"],
                email = data["email"],
                password = pw_hash,
                phone_number = data["phone_number"],
                address = data["address"],
                is_employee = data["is_employee"]
            )
            db.session.add(new_user)
            db.session.commit()
            return make_response(new_user.to_dict(rules=("-password",)), 201)
        except (ValueError, AttributeError, TypeError) as e:
            db.session.rollback()
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
api.add_resource(Users, '/users')

class UserByID(Resource):
    def get(self, id):
        try:
            user = db.session.get(User, id)
            if user:
                return make_response(user.to_dict(rules=('-password',)), 200)
            else:
                return make_response(
                    {"errors": "User Not Found"}, 404
                )
        except (ValueError, AttributeError, TypeError) as e:
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
    def patch(self, id):
        try:
            user = db.session.get(User, id)
            if user:
                data = json.loads(request.data)
                for attr in data:
                    setattr(user, attr, data[attr])
                db.session.add(user)
                db.session.commit()
                return make_response(user.to_dict(), 200)
            else:
                return make_response(
                    {"errors": "Update unsuccessful"}, 400
                )
        except (ValueError, AttributeError, TypeError) as e:
            db.session.rollback()
            return make_response(
                {"errors": [str(e)]}, 400
            )
    
    def delete(self,id):
        try:
            user = db.session.get(User, id)
            if user:
                db.session.delete(user)
                db.session.commit()
                return make_response({}, 204)
            else:
                return make_response(
                    {"errors": "Delete unsuccessful"}, 400
                )
        except (ValueError, AttributeError, TypeError) as e:
            db.session.rollback()
            return make_response(
                {"errors": [str(e)]}, 400
            )
        
api.add_resource(UserByID, '/users/<int:id>')

@app.route('/login/verify', methods=["POST"])
def login():
    try:
        data = json.loads(request.data)
        user = User.query.filter_by(email=data["email"]).first().to_dict(only=('email', 'password'))
        user_pw_hash = user["password"]
        data_pw = data["password"]
        access = flask_bcrypt.check_password_hash(user_pw_hash, data_pw)
        response = {
            "access": access
        }
        return make_response(response, 200)
        
    except (ValueError, AttributeError, TypeError) as e:
        return make_response(
            {"errors": [str(e)]}, 400
        )

if __name__ == '__main__':
    app.run(port=5555, debug=True)

