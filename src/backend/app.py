from flask import Flask, render_template
from flask_cors import CORS
from routes.User import user_routes
from routes.Animation import animation_routes
import os

app = Flask(__name__,
            template_folder=os.path.abspath('../frontend/templates'),  # Carpeta donde se encuentra index.html
            static_folder=os.path.abspath('../frontend'))  # Carpeta para archivos estáticos

CORS(app)  # Permitir solicitudes CORS

# Registro de rutas
app.register_blueprint(user_routes)
app.register_blueprint(animation_routes)

@app.route('/')
def home():
    return render_template('index.html')  # Renderiza index.html desde la carpeta templates

if __name__ == '__main__':
    app.run(debug=True)
