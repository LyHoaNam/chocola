from flask import request,json, jsonify
from flask_restplus import Resource
from time import gmtime, strftime
from ..util.dto import DataDto
from ..service.data_service import (get_a_data
, get_all_data, update_unselected
, update_selected_iddata
, read_data_csv, save_new_data
, info_data_csv,  describe_data_csv,
type_data_csv)
from app.main.service.auth_helper import Auth
api = DataDto.api
_data = DataDto.data


@api.route('/import')
class ImportData(Resource):
    @api.response(201, 'Data successfully imported.')
    @api.doc('import a new data')
    def post(self):
        """import CSV data """
        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')
        #set name of data file csv
        gettoday = strftime("%Y_%m_%d_%H_%M_%S", gmtime())
        name_of_data = str(gettoday) + str(id_user) + '.csv'
        recive = request.files['filecsv']
        UPLOAD_FOLDER = './container/'
        if update_unselected(id_user):
            #savefile
            recive.save(UPLOAD_FOLDER + name_of_data)
            return save_new_data(id_user,name_of_data)
        else:
            api.abort(404)
        

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

@api.route('/page/<getpage>')
@api.param('getpage', 'The page in data')
@api.response(404, 'Data not found.')
class ReadCSV(Resource):
    @api.doc('read csv file selected')
    def get(self, getpage):
        """read csv file in container folder"""
        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')
        int_page = int(getpage)
        return read_data_csv(id_user,int_page)

@api.route('/info')
@api.response(404, 'Page not found.')
class InfoCSV(Resource):
    @api.doc('info csv file selected')
    def get(self):
        """ response info file csv was selected"""
        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')

        return jsonify(info_data_csv(id_user))

@api.route('/describe')
@api.response(404, 'Page not found.')
class InfoCSV(Resource):
    @api.doc('info csv file selected')
    def get(self):
        """ response info file csv was selected"""
        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')

        return jsonify(describe_data_csv(id_user))

@api.route('/types')
@api.response(404, 'Page not found.')
class InfoCSV(Resource):
    @api.doc('info csv file selected')
    def get(self):
        """ response info file csv was selected"""
        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')

        return jsonify(type_data_csv(id_user))