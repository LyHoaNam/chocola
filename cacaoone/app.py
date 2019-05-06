from flask import Flask, jsonify
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
#hand
import setting

app = Flask(__name__)

#setting connect db
app.config['SQLALCHEMY_DATABASE_URI'] = setting.SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = setting.SQLALCHEMY_TRACK_MODIFICATIONS
app.config['BUNDLE_ERRORS'] = setting.BUNDLE_ERRORS

api = Api(app)
db = SQLAlchemy(app)
db.init_app(app)
from endpoint.resource.product_resource import ProductResource, ProductListResource
api.add_resource(AccountResource, '/account/')

@app.route('/')
def index():
    return 'Hello World'

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=3333)
