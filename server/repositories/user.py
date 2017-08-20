from config.database import db

class UserRepository():
    def __init__(self):
        self.db = db

    def findOneByName(self, username):
        return self.db.table('users').where('username', username).first()
