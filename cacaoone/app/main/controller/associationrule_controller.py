from flask import request,json, g
import time
from flask_restplus import Resource
from ..util.dto import AssoRuleDto
from ..service.data_service import (read_all_data_csv, 
describe_count_value_csv, describe_col_select_cout_value_csv)
from ..service.association_rule_service import Fpgrowth, Apiori
from app.main.service.auth_helper import Auth
api = AssoRuleDto.api

@api.route('/fpgrowth/result')
class Data(Resource):
    @api.doc('run algorthm fpgrowth')
    @api.response(404, 'Data not found.')
    def get(self):
        g.request_start_time = time.time()

        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')

        minlen = request.args.get('minlen', type = int)
        minconf = request.args.get('minconf', type = float)
        select_col = request.args.get('sel_col', type = str)

        store_data = read_all_data_csv(id_user,select_col)

        Algorthm = Fpgrowth(store_data, minlen, minconf)
        result = {}
        arr_result = Algorthm.generate_rule()
        result['rules'] = arr_result
        result['len'] = len(arr_result)
        g.request_time = lambda: "%.5fs" % (time.time() - g.request_start_time)
        result['time'] = g.request_time()
        return result


@api.route('/apiori/result')
class Data(Resource):
    @api.doc('run algorthm apiori')
    @api.response(404, 'Data not found.')
    def get(self):
        g.request_start_time = time.time()

        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')

        minsup = request.args.get('minsup', type = float)
        minconf = request.args.get('minconf', type = float)
        select_col = request.args.get('sel_col', type = str)

        store_data = read_all_data_csv(id_user,select_col)

        Algorthm = Apiori(store_data, minsup, minconf)
        result = Algorthm.write_json()
        
        g.request_time = lambda: "%.5fs" % (time.time() - g.request_start_time)
        result['time'] = g.request_time()

        return result

@api.route('/describe')
class Data(Resource):
    @api.doc('return describle of data')
    @api.response(404, 'Data not found.')
    def get(self):
        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')
        result = describe_count_value_csv(id_user)
        return result
@api.route('/col_des')
class Data(Resource):
    @api.doc('return describle of data')
    @api.response(404, 'Data not found.')
    def post(self):
        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')
        
        res= request.json

        result = describe_col_select_cout_value_csv(id_user,res)
        return result