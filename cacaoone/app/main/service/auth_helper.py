from app.main.model.user import User
from ..service.blacklist_service import save_token
from flask_restful import fields, marshal_with

user_fields = {
    'id' : fields.Integer,
    'username' : fields.String,
    'name' : fields.String,
    'img_url' : fields.String,
    'status' : fields.String,
    'Authorization' : fields.String
}

class Auth:

    @staticmethod
    @marshal_with(user_fields)
    def login_user(data):
        try:
            # fetch the user data
            user = User.query.filter_by(username=data.get('username')).first()
            if user:
                password_hash = User.check_password(user,data.get('password'))
                auth_token = user.encode_auth_token(user.id)
                if auth_token and password_hash:
                    response_object = {
                        'status': 'success',
                        'id': user.id,
                        'username' : user.username,
                        'name' : user.name,
                        'img_url' : user.img_url,
                        'Authorization': auth_token.decode()
                    }
                    return response_object, 200
                else:
                    response_object = {
                    'status': 'fail',
                    'message': 'email or password does not match.'
                    }
                    return response_object, 401
            else:
                response_object = {
                    'status': 'fail',
                    'message': 'email or password does not match.'
                }
                return response_object, 401

        except Exception as e:
            response_object = {
                'status': 'fail',
                'message': 'Try again'
            }
            return response_object, 500

    @staticmethod
    def logout_user(data):
        if data:
            auth_token = data
        else:
            auth_token = ''
        if auth_token:
            resp = User.decode_auth_token(auth_token)
            if not isinstance(resp, str):
                # mark the token as blacklisted
                return save_token(token=auth_token)
            else:
                response_object = {
                    'status': 'fail',
                    'message': resp
                }
                return response_object, 401
        else:
            response_object = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            return response_object, 403

    @staticmethod
    def get_logged_in_user(new_request):
        # get the auth token
        auth_token = new_request.headers.get('Authorization')
        if auth_token:
            resp = User.decode_auth_token(auth_token)
            if not isinstance(resp, str):
                user = User.query.filter_by(id=resp).first()
                response_object = {
                    'status': 'success',
                    'data': {
                        'user_id': user.id,
                        'email': user.username,
                        'registered_on': str(user.registered_on)
                    }
                }
                return response_object, 200
            response_object = {
                'status': 'fail',
                'message': resp
            }
            return response_object, 401
        else:
            response_object = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            return response_object, 401