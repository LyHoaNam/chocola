# app/__init__.py
from flask_restplus import Api
from flask import Blueprint

from .main.controller.user_controller import api as user_ns
from .main.controller.auth_controller import api as auth_ns
from .main.controller.data_controller import api as data_ns
from .main.controller.associationrule_controller import api as algorthm_ns
from .main.controller.predit_controller import api as predit_ns
from .main.controller.cluster_controller import api as clusterss_ns
from .main.controller.classification_controller import api as classifcation_ns
blueprint = Blueprint('api', __name__)

api = Api(blueprint,
          title='FLASK RESTPLUS API BOILER-PLATE WITH JWT',
          version='1.0',
          description='a boilerplate for flask restplus web service'
          )

api.add_namespace(user_ns, path='/user')
api.add_namespace(auth_ns)
api.add_namespace(data_ns, path='/data')
api.add_namespace(algorthm_ns, path='/rule')
api.add_namespace(predit_ns,path='/predit')
api.add_namespace(clusterss_ns)
api.add_namespace(classifcation_ns)