from orator import DatabaseManager
from os import environ
from flask import Flask
app = Flask(__name__)

config = {
    'mysql': {
        'driver': 'mysql',
        'host': 'localhost',
        'database': 'alura',
        'user': environ['DB_USER'],
        'password': environ['DB_PASSWORD'],
        'prefix': ''
    }
}

db = DatabaseManager(config)

@app.route("/")
def hello():
    users = db.table('user').get()
    return str(users[0]['email'])
