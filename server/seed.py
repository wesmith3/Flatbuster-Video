#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from config import app, db
# from app_setup import db
from models.user import User
from models.rental import Rental
from models.movie import Movie
from models.review import Review
from models.complaint import Complaint
from models.cart import Cart
from models.stockrequest import StockRequest
from models.cartmovie import CartMovie


fake = Faker()

def create_users():
    users = []
    for _ in range(10):
        c = User(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.email(),
            phone_number=fake.phone_number(),
            address=fake.address(),
            is_employee=fake.boolean(chance_of_getting_true=20),
            password=fake.password()
        )
        users.append(c)

    return users


def create_movies():
    movies = []
    m1 = Movie(title='Psycho', genre='Horror', release_year=1960, stock=4)
    movies.append(m1)
    m2 = Movie(title='Inception', genre='Action', release_year=2010, stock=9)
    movies.append(m2)
    m3 = Movie(title='Pulp Fiction', genre='Thriller', release_year=1994, stock=10)
    movies.append(m3)
    m4 = Movie(title='The Godfather', genre='Drama', release_year=1971, stock=6)
    movies.append(m4)
    m5 = Movie(title='Shawshank Redemption', genre='Drama', release_year=1994, stock=5)
    movies.append(m5)
    m6 = Movie(title='Fantastic Mr. Fox', genre='Comedy', release_year=2009, stock=3)
    movies.append(m6)
    m7 = Movie(title='Iron Man', genre='Action', release_year=2008, stock=8)
    movies.append(m7)
    m8 = Movie(title='The Hangover', genre='Comedy', release_year=2009, stock=6)
    movies.append(m8)
    m9 = Movie(title='The Notebook', genre='Romance', release_year=2004, stock=4)
    movies.append(m9)
    m10 = Movie(title='Frozen', genre='Animation', release_year=2013, stock=7)
    movies.append(m10)
    m11 = Movie(title='The Matrix', genre='Sci-Fi', release_year=1999, stock=5)
    movies.append(m11)
    m12 = Movie(title='Forrest Gump', genre='Drama', release_year=1994, stock=8)
    movies.append(m12)
    m13 = Movie(title='The Dark Knight', genre='Action', release_year=2008, stock=10)
    movies.append(m13)
    m14 = Movie(title='Titanic', genre='Romance', release_year=1997, stock=7)
    movies.append(m14)
    m15 = Movie(title='Avatar', genre='Sci-Fi', release_year=2009, stock=9)
    movies.append(m15)
    m16 = Movie(title='Jurassic Park', genre='Adventure', release_year=1993, stock=5)
    movies.append(m16)
    m17 = Movie(title='The Silence of the Lambs', genre='Thriller', release_year=1991, stock=8)
    movies.append(m17)
    m18 = Movie(title='Eternal Sunshine of the Spotless Mind', genre='Romance', release_year=2004, stock=4)
    movies.append(m18)
    m19 = Movie(title='The Grand Budapest Hotel', genre='Comedy', release_year=2014, stock=7)
    movies.append(m19)

    return movies


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
    
    for _ in range(5):
        user_id = rc([user.id for user in users])
        while any(cart.user_id == user_id for cart in carts):
            user_id = rc([user.id for user in users])
        c = Cart(
            user_id=user_id,
            movie_id=rc([movie.id for movie in movies]),
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