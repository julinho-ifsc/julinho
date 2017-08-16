from orator import DatabaseManager
from os import environ
from flask import Flask, render_template
app = Flask(__name__)

config = {
    'mysql': {
        'driver': 'mysql',
        'host': 'localhost',
        'database': 'julinho',
        'user': environ['DB_USER'],
        'password': environ['DB_PASSWORD'],
        'prefix': ''
    }
}

db = DatabaseManager(config)

@app.route("/")
def home():
    users = db.table('user').get()
    return str(users[0]['email'])

@app.route('/hello/<name>')
def hello(name=None):
    return render_template('hello.html', name=name)
