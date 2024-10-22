from flask import Blueprint

bp = Blueprint('api', __name__)

from routes.User import *
from routes.Animation import *
