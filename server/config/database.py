from os import environ
from dotenv import load_dotenv, find_dotenv
from orator import DatabaseManager

load_dotenv(find_dotenv())

DATABASES = {
    'mysql': {
        'driver': 'mysql',
        'host': 'localhost',
        'database': 'julinho',
        'user': environ['DB_USER'],
        'password': environ['DB_PASSWORD'],
        'prefix': ''
    }
}

db = DatabaseManager(DATABASES)
