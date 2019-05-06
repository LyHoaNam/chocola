from werkzeug.security import generate_password_hash, check_password_hash

from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


class Account(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(200))
    name = db.Column(db.String(10))
    password_hash = db.Column(db.String(200))
    img_url = db.Column(db.Integer)
    def __init__(self, name=None):
        self.name = name
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    def return_id(self):
        return self.id        
    def __init__(self):
        return """
        id: {}, 
        username: {},
        name: {},
        """.format(self.id, self.username, 
        self.name, 
        self.img_url)

