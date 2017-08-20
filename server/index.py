from os import urandom
from flask import Flask, render_template, session
from controllers.login import login_controller
from utils.login_required import login_required

app = Flask(__name__)
app.register_blueprint(login_controller)
app.secret_key = urandom(24)


@app.route('/')
@login_required
def home():
    name = session.get('username')
    return render_template('index.html', name=name)
