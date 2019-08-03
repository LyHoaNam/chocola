from .. import db, flask_bcrypt
import datetime
import jwt

class Data(db.Model):
    """ Data Model for storing data related details """
    __tablename__ = "data_file"

    id_data = db.Column(db.Integer, primary_key=True, autoincrement=True)
    data_name = db.Column(db.String(100), unique=True, nullable=False)
    selected = db.Column(db.Boolean)
    id_user = db.Column(db.Integer)
    inserted_at=datetime.datetime.utcnow()
    
    def __repr__(self):
        return self.data_name
