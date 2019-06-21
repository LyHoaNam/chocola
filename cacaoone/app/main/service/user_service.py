import datetime

from app.main import db
from app.main.model.user import User


def save_new_user(data):
    user = User.query.filter_by(username=data['username']).first()
    if not user:
        password = User.set_password(data['password'])
        new_user = User(
            name=data['name'],
            username=data['username'],
            password_hash=password,
            registered_on=datetime.datetime.utcnow()
        )
        
        save_changes(new_user)
        response_object = {
            'status': 'success',
            'message': 'Successfully registered.'
        }
        return response_object, 201
    else:
        response_object = {
            'status': 'fail',
            'message': 'User already exists. Please Log in.',
        }
        return response_object, 409
def save_new_img(id_u,img_name):
    userid = User.query.filter_by(id=id_u).first()
    if not userid:
        return False
    else:
        User.query.filter_by(id=id_u).update({User.img_url:img_name})
        db.session.commit()
        return True

def get_all_users():
    return User.query.all()


def get_a_user(public_id):
    return User.query.filter_by(id=public_id).first()


def save_changes(data):
    db.session.add(data)
    db.session.commit()
    
def generate_token(user):
    try:
        # generate the auth token
        auth_token = user.encode_auth_token(user.id)
        response_object = {
            'status': 'success',
            'message': 'Successfully registered.',
            'Authorization': auth_token.decode()
        }
        return response_object, 201
    except Exception as e:
        response_object = {
            'status': 'fail',
            'message': 'Some error occurred. Please try again.'
        }
        return response_object, 401

def changes_password(u_id,new_password):
        password = User.set_password(new_password)
        try:
            User.query.filter_by(id=u_id).update({User.password_hash:password})
            db.session.commit()
            response_object = {
            'status': 'success',
            'message': 'Successfully registered.'
            }
            return response_object, 201
        except Exception as e:
            response_object = {
                'status': 'fail',
                'message': 'Some error occurred. Please try again.'
            }
            return response_object, 401