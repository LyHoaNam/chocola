from flask import request,json
from flask_restplus import Resource
from ..util.dto import PreditDto
from ..service.predit_service import Predit
from ..service.data_service import get_a_data
from app.main.service.auth_helper import Auth
api = PreditDto.api

@api.route('/knnbasic/unique')
class Unique(Resource):
    @api.doc('run algorthm knnbasic')
    @api.response(404, 'Data not found.')
    def get(self):
        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')

        data_file_name = str(get_a_data(id_user))

        column = request.args.get('col', type = str)

        Algorthm = Predit()
        return Algorthm.unique_column(column,data_file_name)

@api.route('/knnbasic/result')
class Result(Resource):
    @api.doc('run algorthm knnbasic')
    @api.response(404, 'Data not found.')
    def get(self):
        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')

        data_file_name = str(get_a_data(id_user))

        col_uid = request.args.get('uid', type = str)
        col_iid = request.args.get('iid', type = str)
        col_rati = request.args.get('rati', type = str)
        value_uid = request.args.get('value_uid', type = int)
        value_iid = request.args.get('value_iid', type = int)

        Algorthm = Predit()
        return Algorthm.alknnbasic(data_file_name,
            col_uid, col_iid, col_rati, 
            value_uid, value_iid)