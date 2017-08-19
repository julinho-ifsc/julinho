from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())

from os import environ

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
