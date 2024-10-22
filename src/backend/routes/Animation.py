from flask import Blueprint

animation_routes = Blueprint('animation_routes', __name__)

@animation_routes.route('/animations', methods=['GET', 'POST'])
def handle_animations():
    if request.method == 'POST':
        # Lógica para guardar una animación
        pass
    return {'message': 'List of animations'}  # Ejemplo de respuesta JSON
