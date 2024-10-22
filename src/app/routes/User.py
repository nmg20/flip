from flask import Blueprint

user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/users', methods=['GET'])
def get_users():
    return {'message': 'List of users'}  # Ejemplo de respuesta JSON
