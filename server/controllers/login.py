from flask import Blueprint, render_template, request, redirect, session
from services.user import is_authorized

login_controller = Blueprint('login_controller', __name__)

@login_controller.route('/login')
def render_login():
    return render_template('login.html')

@login_controller.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    if is_authorized(username, password):
        session['username'] = username
        return redirect('/')

    return redirect('/login')

@login_controller.route('/logout')
def logout():
    session.pop('username', None)
    return redirect('/login')
