from orator.seeds import Seeder

class PointsTableSeeder(Seeder):

    def run(self):
        """
        Run the database seeds.
        """
        self.db.table('points').insert({
            'name': 'biblioteca',
            'rfid': '123456'
        })

