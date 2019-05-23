from flask_restplus import Namespace, fields


class UserDto:
    api = Namespace('user', description='user related operations')
    user = api.model('user', {
        'id': fields.String(description='user Identifier'),
        'username': fields.String(required=True, description='user username'),
        'password': fields.String(required=True, description='user password'),
        'name': fields.String(required=True, description='user name'),
        'img_url': fields.String(description='img  url')
    })
class AuthDto:
    api = Namespace('auth', description='authentication related operations')
    user_auth = api.model('auth_details', {
        'username': fields.String(required=True, description='The email address'),
        'password': fields.String(required=True, description='The user password '),
    })
class DataDto:
    api = Namespace('data' , description='data related operations')
    data = api.model('data', {
        'id_data': fields.String(description='data Identifier'),
        'id_user': fields.String(description='user Identifier'),
        'selected': fields.String(description='selected data'),
        'data_name': fields.String(description='data name')
    })
class AssoRuleDto:
    api = Namespace('rule' , description='algorthm assosition rule operations')
class PreditDto:
    api = Namespace('preidt' , description='algorthm preidt operations')
class ClusterDto:
    api = Namespace('cluster', description='algorthm cluster operation')
    