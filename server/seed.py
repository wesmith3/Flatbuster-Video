#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from config import app, db, flask_bcrypt
# from app_setup import db
from models.user import User
from models.rental import Rental
from models.movie import Movie
from models.review import Review
from models.complaint import Complaint
from models.cart import Cart
from models.stockrequest import StockRequest
from models.cartmovie import CartMovie
from data import movies



fake = Faker()

def create_users():
    users = []
    for _ in range(10):
        pw_hash = flask_bcrypt.generate_password_hash("password").decode("utf-8")
        c = User(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.email(),
            phone_number=fake.phone_number(),
            address=fake.address(),
            is_employee=fake.boolean(chance_of_getting_true=20),
        )
        c.password = "password"
        users.append(c)

    return users


def create_movies():
    movie_list = []
    for movie in movies:
        new_movie = Movie(
            title=movie.get("title"),
            description=movie.get("description"),
            genre=', '.join(movie.get("genre")),
            image=movie.get("image"),
            release_year=movie.get("year"),
            stock=rc(range(0, 10)),
            rating=movie.get("rating"),
        )
        movie_list.append(new_movie)
    
    return movie_list


def create_rentals(users, movies):
    rentals = []
    for _ in range(20):
        r = Rental(
            rental_date=fake.date_time(),
            return_date=fake.future_date(),
            user_id=rc([user.id for user in users]),
            movie_id=rc([movie.id for movie in movies])
        )
        rentals.append(r)

    return rentals

def create_reviews(rentals):
    reviews = []
    comments = [
        "Great movie! Highly recommended.",
        "The plot was a bit confusing, but I enjoyed it.",
        "Awesome acting and cinematography.",
        "Disappointed with the ending.",
        "One of the best movies I've seen!",
        "The characters were well-developed.",
        "Not my cup of tea, but others might like it.",
        "Couldn't stop laughing! Hilarious.",
        "A must-watch for all film enthusiasts.",
        "The soundtrack was amazing!"
    ]

    for _ in range(10):
        r = Review(
            comment=rc(comments),
            rating=rc(range(0, 5)),
            date=fake.future_date(),
            rental_id=rc([rental.id for rental in rentals])
        )
        reviews.append(r)

    return reviews

def create_complaints(users):
    complaints = []
    descriptions = [
        "Poor customer service experience.",
        "The product arrived damaged.",
        "Issues with billing and payment.",
        "Unsatisfactory product quality.",
        "Delayed delivery, very frustrating.",
        "Difficulty in contacting customer support.",
        "Received the wrong item in my order.",
        "Product doesn't match the description.",
        "Frequent website/app errors.",
        "Unresponsive customer support."
    ]

    for _ in range(10):
        c = Complaint(
            description=rc(descriptions),
            user_id=rc([user.id for user in users])
        )
        complaints.append(c)

    return complaints

def create_carts(users, movies):
    carts = []
    
    for _ in range(10):
        user_id = rc([user.id for user in users])
        while any(cart.user_id == user_id for cart in carts):
            user_id = rc([user.id for user in users])
        c = Cart(
            user_id=user_id,
        )
        carts.append(c)

    return carts

def create_stock_request(users, movies):
    stock_request = []
    
    for _ in range(25):
        r = StockRequest(
            user_id=rc([user.id for user in users]),
            movie_id=rc([movie.id for movie in movies]),
            request_date=fake.future_date(),
            status=fake.boolean(),
        )
        stock_request.append(r)

    return stock_request

def create_movie_cart(carts, movies):
    movie_cart = []
    
    for _ in range(25):
        mc = CartMovie(
            cart_id=rc([cart.id for cart in carts]),
            movie_id=rc([movie.id for movie in movies]),
        )
        movie_cart.append(mc)

    return movie_cart


if __name__ == '__main__':

    with app.app_context():
        print("Clearing db...")
        User.query.delete()
        Movie.query.delete()
        Review.query.delete()
        Rental.query.delete()
        Complaint.query.delete()
        Cart.query.delete()
        StockRequest.query.delete()
        CartMovie.query.delete()
        
        print("Creating tables...")
        db.create_all()

        print("Seeding users...")
        users = create_users()
        db.session.add_all(users)
        db.session.commit()

        print("Seeding movies...")
        movies = create_movies()
        db.session.add_all(movies)
        db.session.commit()

        print("Seeding rentals...")
        rentals = create_rentals(users, movies)
        db.session.add_all(rentals)
        db.session.commit()
        
        print("Seeding reviews...")
        reviews = create_reviews(rentals)
        db.session.add_all(reviews)
        db.session.commit()
        
        print("Seeding complaints...")
        complaints = create_complaints(users)
        db.session.add_all(complaints)
        db.session.commit()
        
        print("Seeding carts...")
        carts = create_carts(users, movies)
        db.session.add_all(carts)
        db.session.commit()
        
        print("Seeding stock request...")
        stock_requests = create_stock_request(users, movies)
        db.session.add_all(stock_requests)
        db.session.commit()
        
        print("Seeding cart movies...")
        cart_movies = create_movie_cart(carts, movies)
        db.session.add_all(cart_movies)
        db.session.commit()

        print("Seeding complete!!!")
        
print("Flask app and SQLAlchemy imported in seed.py.")