from sys import argv, exit
from os import environ, listdir
from os.path import isfile, join
from subprocess import call
from dotenv import load_dotenv, find_dotenv

DATABASE_CONFIG_PATH = 'server/config/database.py'
MIGRATIONS_PATH = 'server/migrations/'
SEEDS_PATH = 'server/seeds/'

def list_files(files_path):
    return [f for f in listdir(files_path) if isfile(join(files_path, f))]

def remove_files_extension(files):
    return [f[0:-3] for f in files]

def remove_special_files(files):
    return [f for f in files if not f.startswith('__')]

def entered_command(arguments):
    if len(arguments) >= 2:
        return arguments[1]
    return None

def commands_help():
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
        '    seed:all - Run all the seeds',
        '        python run.py seed:all',
        '',
        '    seed - Run a seeds',
        '        python run.py seed <seed_name>',
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
    call(
        'orator migrate -c {config} -p {path}'.format(
            config=DATABASE_CONFIG_PATH,
            path=MIGRATIONS_PATH
        )
    )

def make_migration():
    if len(argv) >= 3:
        migration_name = argv[2]
    else:
        print('A name must be provided.')
        commands_help()
        exit(1)
    call(
        'orator make:migration {migration_name} -p {path}'.format(
            migration_name=migration_name,
            path=MIGRATIONS_PATH
        )
    )

def seed_all():
    seeds = remove_files_extension(remove_special_files(list_files(SEEDS_PATH)))
    for name in seeds:
        call(
            'orator db:seed -c {config} -p {path} --seeder {name}'.format(
                config=DATABASE_CONFIG_PATH,
                path=SEEDS_PATH,
                name=name
            )
        )

def seed():
    if len(argv) >= 3:
        seed_name = argv[2]
    else:
        print('A name must be provided.')
        commands_help()
        exit(1)

    call(
        'orator db:seed -c {config} -p {path} --seeder {seed}'.format(
            config=DATABASE_CONFIG_PATH,
            seed=seed_name,
            path=SEEDS_PATH
        )
    )

def make_seed():
    if len(argv) >= 3:
        seed_name = argv[2]
    else:
        print('A name must be provided.')
        commands_help()
        exit(1)
    call(
        'orator make:seed {seed_name} -p {path}'.format(
            seed_name=seed_name,
            path=SEEDS_PATH
        )
    )


def main():
    commands = {
        'server': server,
        'migrate': migrate,
        'make:migration': make_migration,
        'seed:all': seed_all,
        'seed': seed,
        'make:seed': make_seed
    }
    command = commands.get(entered_command(argv), commands_help)
    command()

if __name__ == '__main__':
    main()
