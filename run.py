from os import environ
from subprocess import call
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())

environ['FLASK_APP'] = "server/index.py"

if environ['ENV'] == "dev":
    environ['FLASK_DEBUG'] = "1"

call("flask run")
