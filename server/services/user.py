import bcrypt
from repositories.user import UserRepository

def is_authorized(username, password):
    user_repository = UserRepository()
    user = user_repository.findOneByName(username)

    if not user:
        return False

    if bcrypt.checkpw(str.encode(password), str.encode(user['password'])):
        return True

    return False
