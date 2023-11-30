# Standard library imports

# Remote library imports
from flask import Flask, request, make_response
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import MetaData
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from flask_bcrypt import Bcrypt
from datetime import datetime, timedelta, timezone
import os
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

# Local imports

# Instantiate app, set attributes
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'ThisIsAVeryBasicSecretKey'
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)
flask_bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app)
