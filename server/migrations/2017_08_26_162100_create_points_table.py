from orator.migrations import Migration


class CreatePointsTable(Migration):

    def up(self):
        """
        Run the migrations.
        """
        with self.schema.create('points') as table:
            table.increments('id')
            table.string('rfid')
            table.string('name')
            table.timestamps()

    def down(self):
        """
        Revert the migrations.
        """
        self.schema.drop('points')
