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
    for _ in range(10):
        m = Movie(
            title=fake.job(),
            genre=fake.word(),
            release_year=fake.year(),
            stock=rc(range(0, 4)),
        )
        movies.append(m)

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


if __name__ == '__main__':

    with app.app_context():
        print("Clearing db...")
        User.query.delete()
        Movie.query.delete()
        Rental.query.delete()
        
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

        print("Seeding complete!!!")
        
print("Flask app and SQLAlchemy imported in seed.py.")