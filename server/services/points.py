from repositories.point import PointRepository

def get_all():
    point_repository = PointRepository()
    return point_repository.get_all()

def get_point(point_id):
    point_repository = PointRepository()
    return point_repository.get_one(point_id)

def create_point(name, rfid):
    if not name:
        raise Exception('Nome inválido')

    if not rfid:
        raise Exception('RFID inválido')

    point_repository = PointRepository()
    point_id = point_repository.create_point(name=name, rfid=rfid)
    return point_id

def remove_point(point_id):
    point_repository = PointRepository()
    point_repository.remove_point(point_id)

def update_point(point_id, name, rfid):
    if not name:
        raise Exception('Nome inválido')

    if not rfid:
        raise Exception('RFID inválido')

    point_repository = PointRepository()
    point_repository.update_point(point_id, name, rfid)

    return {
        'id': point_id,
        'name': name,
        'rfid': rfid
    }
