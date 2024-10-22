from flask import Flask, render_template
from routes.User import user_routes
from routes.Animation import animation_routes

app = Flask(__name__)

# Register routes
app.register_blueprint(user_routes)
app.register_blueprint(animation_routes)

@app.route('/')
def home():
    return render_template('index.html')  # Renderiza la plantilla HTML

if __name__ == '__main__':
    app.run(debug=True)
