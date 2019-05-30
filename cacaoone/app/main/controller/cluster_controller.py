from flask import request,jsonify
from flask_restplus import Resource
from ..util.dto import ClusterDto
from app.main.service.auth_helper import Auth
from ..service.data_service import get_a_data
from ..service.cluster_service import Cluster
api = ClusterDto.api

@api.route('/optimum')
class Optimum(Resource):
    @api.doc('run algorthm fpgrowth')
    @api.response(404, 'Data not found.')
    def get(self):
        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')
        
        data_file_name = str(get_a_data(id_user))

        col1 = request.args.get('col1', type = str)
        col2 = request.args.get('col2', type = str)

        clusters = Cluster(data_file_name,col1,col2)
        return clusters.convert_optimum_to_json()
@api.route('/define')
class Define(Resource):
    @api.doc('run algorthm define')
    @api.response(404, 'Err something')
    def get(self):
        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')

        data_file_name = str(get_a_data(id_user))

        col1 = request.args.get('col1', type = str)
        col2 = request.args.get('col2', type = str)
        k_cluster = request.args.get('k', type = int)

        clusters = Cluster(data_file_name,col1,col2)
        return clusters.define_cluster(k_cluster)


