from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import MetaData
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from flask_sqlalchemy import SQLAlchemy
from config import db
from flask_migrate import Migrate
from flask import Flask, request, make_response
from flask_restful import Api, Resource
import os


metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)