from orator.seeds import Seeder
import bcrypt

class UsersTableSeeder(Seeder):
    def run(self):
        """
        Run the database seeds.
        """
        password = b"julinhoadmin123"
        hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())

        self.db.table('users').insert({
            'username': 'admin',
            'password': hashed_password
        })
