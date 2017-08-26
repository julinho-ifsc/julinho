from config.database import db

class PointRepository():
    def __init__(self):
        self.table = db.table('points')

    def get_all(self):
        return self.table.get().all()

    def get_one(self, point_id):
        return self.table.where('id', point_id).first()

    def create_point(self, name, rfid):
        return self.table.insert_get_id({
            'name': name,
            'rfid': rfid
        })

    def remove_point(self, point_id):
        self.table.where('id', point_id).delete()

    def update_point(self, point_id, name, rfid):
        self.table.where('id', point_id).update(name=name, rfid=rfid)
