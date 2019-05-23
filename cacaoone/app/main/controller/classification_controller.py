from ..util.dto import ClassificationDto
from flask_restplus import Resource
from ..service.data_service import read_all_data_csv
from flask import request,json
from app.main.service.auth_helper import Auth
from ..service.NaiveBayes_service import _GaussianNB
from ..service.NaiveBayes_service import _MultinomialNB
api=ClassificationDto.api

@api.route('/GaussianNB')
class GaussianNB(Resource):
    @api.doc('Run alogorithm GaussianNB')
    @api.response(201,'Completed')
    def get(self):
        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')
        result = read_all_data_csv(id_user)
        dataset = result.get('data')
        test_size=request.args.get('test_size', type=int)
        random_state=request.args.get('random_state', type=float)
        GaussNB=_GaussianNB(dataset, test_size, random_state)
        return GaussNB.write_json()
@api.route('/MultinomialNB')
class MultinomialNB(Resource):
    @api.doc('Run alogorithm MultinomialNB')
    @api.response(201,'Completed')
    def get(self):
        response = Auth.get_logged_in_user(new_request=request)
        user_profile = response[0].get('data')
        id_user = user_profile.get('user_id')
        result = read_all_data_csv(id_user)
        dataset = result.get('data')
        test_size=request.args.get('test_size', type=int)
        random_state=request.args.get('random_state', type=float)
        MultiNB=_MultinomialNB(dataset, test_size, random_state)
        return MultiNB.write_json()