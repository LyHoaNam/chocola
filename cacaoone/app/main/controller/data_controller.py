from flask import request,json
from flask_restplus import Resource

from ..util.dto import DataDto
from ..service.data_service import (get_a_data
, get_all_data, update_unselected
, update_selected_iddata
, read_data_csv)
from app.main.service.auth_helper import Auth
api = DataDto.api
_data = DataDto.data


@api.route('/')
class ImportData(Resource):
    @api.response(201, 'Data successfully imported.')
    @api.doc('import a new data')
    def post(self):
        """Creates a new User """
        data = request.files['filedata']
        #this need rename in fronend key to filedata
        pass

@api.route('/selected')
class Data(Resource):
    @api.doc('get a data')
    @api.response(404, 'Data not found.')
    @api.marshal_with(_data)
    def get(self):
        """get a selected data from user"""
        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')
        data = get_a_data(id_user)
        if not data:
            api.abort(404)
        else:
            return data
    @api.response(201, 'User successfully created.')
    @api.doc('change selected')
    def post(self):
        """change selected data"""
        data = request.json
        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')
        if update_unselected(id_user):
            return update_selected_iddata(id_user,data)
        else:
            api.abort(404)

@api.route('/all')
@api.response(404, 'Data not found.')
class AllData(Resource):
    @api.doc('get all data')
    @api.marshal_list_with(_data)
    def get(self):
        """get all data from user"""
        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')
        data = get_all_data(id_user)
        if not data:
            api.abort(404)
        else:
            return data

@api.route('/<page>')
@api.param('page', 'The page in data')
@api.response(404, 'Data not found.')
class ReadCSV(Resource):
    @api.doc('read csv file selected')
    def get(self, page):
        """read csv file in container folder"""
        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')
        int_page = int(page)
        return read_data_csv(id_user,int_page)