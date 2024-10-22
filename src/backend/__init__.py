from flask import Flask
from database import base, engine

app = Flask(__name__)
base.metadata.create_all(bind=engine)

from routes import *
