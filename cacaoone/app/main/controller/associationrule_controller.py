from flask import request,json
from flask_restplus import Resource
from ..util.dto import AssoRuleDto
from ..service.data_service import read_all_data_csv
from ..service.association_rule_service import Fpgrowth, Apiori
from app.main.service.auth_helper import Auth
api = AssoRuleDto.api

@api.route('/fpgrowth/rule')
class Data(Resource):
    @api.doc('run algorthm fpgrowth')
    @api.response(404, 'Data not found.')
    def get(self):
        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')
        result = read_all_data_csv(id_user)
        data = result.get('data')
        minlen = request.args.get('minlen', type = int)
        minconf = request.args.get('minconf', type = float)
        Algorthm = Fpgrowth(data, minlen, minconf)
        return Algorthm.write_json()
@api.route('/fpgrowth/frequent')
class Data(Resource):
    @api.doc('run algorthm fpgrowth')
    @api.response(404, 'Data not found.')
    def get(self):
        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')
        result = read_all_data_csv(id_user)
        data = result.get('data')
        minlen = request.args.get('minlen', type = int)
        minconf = request.args.get('minconf', type = float)
        Algorthm = Fpgrowth(data, minlen, minconf)
        return Algorthm.sort_patteerns()

@api.route('/apiori/rule')
class Data(Resource):
    @api.doc('run algorthm apiori')
    @api.response(404, 'Data not found.')
    def get(self):
        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')
        result = read_all_data_csv(id_user)
        data = result.get('data')
        minlen = request.args.get('minlen', type = int)
        minsup = request.args.get('minsup', type = float)
        minconf = request.args.get('minconf', type = float)
        Algorthm = Apiori(data, minlen,minsup, minconf)
        return Algorthm.write_json()