from flask import Flask, render_template

app = Flask(__name__)
# from orator import DatabaseManager
# from os import environ
# import bcrypt
# password = b"super secret password"
# hashed = bcrypt.hashpw(password, bcrypt.gensalt())
# db = DatabaseManager(config)

@app.route('/hello/<name>')
def hello(name=None):
    return render_template('hello.html', name=name)
