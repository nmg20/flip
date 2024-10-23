from flask import Blueprint, request, jsonify
import jwt
import bcrypt
from datetime import datetime, timedelta
from database import SessionLocal

user_routes = Blueprint('user_routes', __name__)
SECRET_KEY = "clave super secreta"

@user_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    session = SessionLocal()
    user = session.query(User).filter_by(username=username).first()

    if user and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.utcnow() + timedelta(hours=24)
        }, SECRET_KEY)
        return jsonify({'token': token.decode('utf-8')})
    return jsonify({'error': 'Error de autenticación'}), 401