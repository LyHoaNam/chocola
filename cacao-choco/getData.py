from flask import Flask, render_template, request
from flask_cors import CORS
from flask import request, jsonify
import pandas as pd
import urllib.request
#import fpgrowth algorthm
import fp_growth as fp 
#import apiori algorthm
import apiori as ap
#import CountFile module
import importlib.util
spec = importlib.util.spec_from_file_location("module.name", "D:/KhoaLuanTotNghiep/source/chocola/cacao-choco/container/countfile.py")
foo = importlib.util.module_from_spec(spec)
spec.loader.exec_module(foo)
#Where to save file
UPLOAD_FOLDER = 'D:/KhoaLuanTotNghiep/source/chocola/cacao-choco/container/'
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config["DEBUG"] = True
@app.route('/')
def home():
   return 'home'
# get file upload
@app.route('/api',methods = ['POST', 'GET'])
def result():

	#Count file in folder container
	NameofFile = foo.CountofFile()+1
	recive = "null"	
	if request.method== "POST":
		recive=request.files["key"]
		recive.save(UPLOAD_FOLDER+str(NameofFile)+".csv")
	return recive
@app.route('/api/fpgrowth')
def api_fp():
	dataFileName="./container/"+str(foo.CountofFile()+1)+".csv"
	store_data = pd.read_csv(dataFileName,header=None, keep_default_na=False)
	result_fpgrowth= fp.fpgrowth(store_data,4,0.9)
	return jsonify(result_fpgrowth)
@app.route('/api/apiori')
def api_ap():
	dataFileName="./container/"+str(foo.CountofFile()+1)+".csv"
	store_data = pd.read_csv(dataFileName,header=None, keep_default_na=False)
	result_apyori = ap.apyori_ar(store_data,0.045,0.7)
	return jsonify(result_apyori)
# @app.route('/api/kmean')
# def api_kmean():
# 	return 'kmean'
app.run(debug = True)
flask_cors.CORS(app, expose_headers='Authorization')