from os import environ
from subprocess import call
from dotenv import load_dotenv, find_dotenv
from sys import argv, exit

def entered_command(argv):
    if len(argv) >= 2:
        return argv[1]
    return None

def help():
    message = (
        'Usage:',
        '    python run.py <command>',
        '',
        'Commands:',
        '    server - Start a development server',
        '        python run.py server',
        '',
        '    migrate - Run the migrations',
        '        python run.py migrate',
        '',
        '    make:migration - Create a new migration',
        '        python run.py make:migration <migration_name>'
    )
    print('\n'.join(message))

def server():
    load_dotenv(find_dotenv())
    environ['FLASK_APP'] = 'server/index.py'

    if environ['ENV'] == 'dev':
        environ['FLASK_DEBUG'] = '1'

    call('flask run')

def migrate():
    call('orator migrate -c server/config/database.py -p server/migrations')

def make_migration():
    if len(argv) >= 3:
        migration_name = argv[2]
    else:
        print('A name must be provided.')
        help()
        exit(1)
    call(
        'orator make:migration {migration_name} -p server/migrations'.format(
            migration_name=migration_name
        )
    )

def main():
    commands = {
        'server': server,
        'migrate': migrate,
        'make:migration': make_migration
    }
    command = commands.get(entered_command(argv), help)
    command()

if __name__ == '__main__':
    main()
