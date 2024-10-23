from flask import Blueprint
from database import SessionLocal

animation_routes = Blueprint('animation_routes', __name__)
SECRET_KEY = "clave super secreta"

@animation_routes.route('/animations', methods=['POST'])
def save_animation():
    token = request.headers.get('Authorization').split(" ")[1]
    data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    
    user_id = data.get('user_id')
    anim_data = request.get_json()
    name = anim_data.get('name')
    frames = anim_data.get('frames')  # Suponiendo que recibes los fotogramas como JSON
    
    session = SessionLocal()
    animation = Animation(name=name, frames=frames, user_id=user_id)
    session.add(animation)
    session.commit()
    
    return jsonify({'message': 'Animation saved successfully!'})

@animation_routes.route('/animations', methods=['GET'])
def get_animations():
    token = request.headers.get('Authorization').split(" ")[1]
    data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    
    user_id = data.get('user_id')
    
    session = Session()
    animations = session.query(Animation).filter_by(user_id=user_id).all()
    
    return jsonify([{
        'id': anim.id,
        'name': anim.name,
        'frames': anim.frames
    } for anim in animations])