from flask import request
from flask_restplus import Resource
from time import gmtime, strftime
from ..util.dto import UserDto
from ..service.user_service import (save_new_user, 
get_all_users, get_a_user, save_new_img)
from app.main.service.auth_helper import Auth
api = UserDto.api
_user = UserDto.user


@api.route('/')
class UserList(Resource):
    @api.doc('list_of_registered_users')
    @api.marshal_list_with(_user, envelope='data')
    def get(self):
        """List all registered users"""
        return get_all_users()

    @api.response(201, 'User successfully created.')
    @api.doc('create a new user')
    @api.expect(_user, validate=True)
    def post(self):
        """Creates a new User """
        data = request.json
        return save_new_user(data=data)


@api.route('/<public_id>')
@api.param('public_id', 'The User identifier')
@api.response(404, 'User not found.')
class User(Resource):
    @api.doc('get a user')
    @api.marshal_with(_user)
    def get(self, public_id):
        """get a user given its identifier"""
        user = get_a_user(public_id)
        if not user:
            api.abort(404)
        else:
            return user

@api.route('/info')
@api.response(404, 'User not found.')
class User(Resource):
    @api.doc('get a user')
    @api.marshal_with(_user)
    def get(self):
        """get a info of user"""
        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')
        user = get_a_user(id_user)
        if not user:
            api.abort(404)
        else:
            return user

@api.route('/import_img')
class ImportData(Resource):
    @api.response(201, 'Data successfully imported.')
    @api.doc('import a new img')
    def post(self):
        """import JPG avartar """
        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')
        #set name of data file csv
        gettoday = strftime("%Y%m%d%H%M%S", gmtime())
        name_of_data = str(gettoday) + str(id_user) + '.jpg'
        recive = request.files['fileimg']
        UPLOAD_FOLDER = '../chocodeli/src/img/'
        if save_new_img(id_user,name_of_data):
            #savefile
            recive.save(UPLOAD_FOLDER + name_of_data)
            return name_of_data
        else:
            api.abort(404)