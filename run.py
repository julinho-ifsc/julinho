from os import environ, listdir
from os.path import isfile, join
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
        '        python run.py make:migration <migration_name>',
        '',
        '    seed - Run the seeds',
        '        python run.py seed',
        '',
        '    make:seed - Create a new seed',
        '        python run.py make:seed <seed_name>'
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

def seed():
    seeds = remove_files_extension(remove_special_files(list_files('server/seeds')))
    for seed in seeds:
        call('orator db:seed -c server/config/database.py -p server/seeds --seeder {seed}'.format(seed=seed))

def make_seed():
    if len(argv) >= 3:
        seed_name = argv[2]
    else:
        print('A name must be provided.')
        help()
        exit(1)
    call(
        'orator make:seed {seed_name} -p server/seeds'.format(
            seed_name=seed_name
        )
    )


def main():
    commands = {
        'server': server,
        'migrate': migrate,
        'make:migration': make_migration,
        'seed': seed,
        'make:seed': make_seed
    }
    command = commands.get(entered_command(argv), help)
    command()

def list_files(files_path):
    return [f for f in listdir(files_path) if isfile(join(files_path, f))]

def remove_files_extension(files):
    return [f[0:-3] for f in files]

def remove_special_files(files):
    return [f for f in files if not f.startswith('__')]

if __name__ == '__main__':
    main()
