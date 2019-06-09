from flask import request, json, g
from flask_restplus import Resource
import time
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
        #count time request
        g.request_start_time = time.time()
    
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
        result = {}
        result['result'] = Algorthm.alknnbasic(data_file_name,
            col_uid, col_iid, col_rati, 
            value_uid, value_iid)
        g.request_time = lambda: "%.5fs" % (time.time() - g.request_start_time)
        result['time'] = g.request_time()
        return result

@api.route('/knnbasic/fromto')
class Fromto(Resource):
    @api.doc('run algorthm from to knnbasic')
    @api.response(404, 'Data not found.')
    def get(self):
        #count time request
        g.request_start_time = time.time()
        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')

        data_file_name = str(get_a_data(id_user))

        col_uid = request.args.get('uid', type = str)
        col_iid = request.args.get('iid', type = str)
        col_rati = request.args.get('rati', type = str)
        from_uid = request.args.get('from_uid', type = int)
        to_uid = request.args.get('to_uid', type = int)
        from_iid = request.args.get('from_iid', type = int)
        to_iid = request.args.get('to_iid', type = int)

        Algorthm = Predit()
        result = {}
        result['result'] = Algorthm.from_to(data_file_name,
            col_uid, col_iid, col_rati, from_uid,
            to_uid, from_iid, to_iid)
        g.request_time = lambda: "%.5fs" % (time.time() - g.request_start_time)
        result['time'] = g.request_time()
        return result

@api.route('/knnbasic/chartvalue')
class ChartValue(Resource):
    @api.doc('return chart data from value input')
    @api.response(404, 'Data not found.')
    def get(self):
        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')

        data_file_name = str(get_a_data(id_user))

        col_uid = request.args.get('uid', type = str)
        col_iid = request.args.get('iid', type = str)
        col_rati = request.args.get('rati', type = str)
        uid_value = request.args.get('value_uid', type = int)
        iid_value = request.args.get('value_iid', type = int)
        Algorthm = Predit()
        result = {}
        result['line1'] = Algorthm.chart_of_value(data_file_name,
            col_uid, col_iid, col_rati, uid_value)
            
        result['line2'] = Algorthm.chart_of_value(data_file_name,
            col_iid, col_uid, col_rati, iid_value)
        return result


@api.route('/knnbasic/rawdata')
class RawData(Resource):
    @api.doc('return chart data from value input')
    @api.response(404, 'Data not found.')
    def get(self):
        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')

        data_file_name = str(get_a_data(id_user))
        
        page = request.args.get('page', type = int)
        col_uid = request.args.get('uid', type = str)
        col_iid = request.args.get('iid', type = str)
        col_rati = request.args.get('rati', type = str)
        
        Algorthm = Predit()
        result = {}
        result['status'] = 'success'
        result['data'] = Algorthm.read_data_csv(data_file_name, page,
            col_iid, col_uid, col_rati)
        return result

@api.route('/nmf/result')
class Result(Resource):
    @api.doc('run algorthm svd')
    @api.response(404, 'Data not found.')
    def get(self):
        g.request_start_time = time.time()
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
        result = {}
        result['result'] =Algorthm.nmf(data_file_name,
            col_uid, col_iid, col_rati, 
            value_uid, value_iid)
        g.request_time = lambda: "%.5fs" % (time.time() - g.request_start_time)
        result['time'] = g.request_time()
        return result

@api.route('/nmf/fromto')
class Fromto(Resource):
    @api.doc('run algorthm from to knnbasic')
    @api.response(404, 'Data not found.')
    def get(self):
        #count time request
        g.request_start_time = time.time()
        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')

        data_file_name = str(get_a_data(id_user))

        col_uid = request.args.get('uid', type = str)
        col_iid = request.args.get('iid', type = str)
        col_rati = request.args.get('rati', type = str)
        from_uid = request.args.get('from_uid', type = int)
        to_uid = request.args.get('to_uid', type = int)
        from_iid = request.args.get('from_iid', type = int)
        to_iid = request.args.get('to_iid', type = int)

        Algorthm = Predit()
        result = {}
        result['result'] = Algorthm.nmf_from_to(data_file_name,
            col_uid, col_iid, col_rati, from_uid,
            to_uid, from_iid, to_iid)
        g.request_time = lambda: "%.5fs" % (time.time() - g.request_start_time)
        result['time'] = g.request_time()
        return result

@api.route('/SlopeOne/result')
class Result(Resource):
    @api.doc('run algorthm svd')
    @api.response(404, 'Data not found.')
    def get(self):
        g.request_start_time = time.time()
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
        result = {}
        result['result'] =Algorthm.SlopeOne(data_file_name,
            col_uid, col_iid, col_rati, 
            value_uid, value_iid)
        g.request_time = lambda: "%.5fs" % (time.time() - g.request_start_time)
        result['time'] = g.request_time()
        return result

@api.route('/SlopeOne/fromto')
class Fromto(Resource):
    @api.doc('run algorthm from to knnbasic')
    @api.response(404, 'Data not found.')
    def get(self):
        #count time request
        g.request_start_time = time.time()
        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')

        data_file_name = str(get_a_data(id_user))

        col_uid = request.args.get('uid', type = str)
        col_iid = request.args.get('iid', type = str)
        col_rati = request.args.get('rati', type = str)
        from_uid = request.args.get('from_uid', type = int)
        to_uid = request.args.get('to_uid', type = int)
        from_iid = request.args.get('from_iid', type = int)
        to_iid = request.args.get('to_iid', type = int)

        Algorthm = Predit()
        result = {}
        result['result'] = Algorthm.SlopeOne_from_to(data_file_name,
            col_uid, col_iid, col_rati, from_uid,
            to_uid, from_iid, to_iid)
        g.request_time = lambda: "%.5fs" % (time.time() - g.request_start_time)
        result['time'] = g.request_time()
        return result