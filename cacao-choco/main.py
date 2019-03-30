from flask import Flask, render_template, request
from flask_cors import CORS
from flask import request, jsonify
import pandas as pd
import urllib.request
#import fpgrowth algorthm
import fp_growth as fp 
#import apiori algorthm
import apiori as ap
import readData as rd
#Where to save file
UPLOAD_FOLDER = './container/'
#import CountFile module
import countfile as file

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config["DEBUG"] = True
@app.route('/')
def home():
   return 'home'
# get file upload
@app.route('/api',methods = ['POST', 'GET'])
def result():

	#Count file in folder container
	NameofFile = file.CountofFile()+1
	recive = "null"	
	if request.method== "POST":
		recive=request.files["key"]
		recive.save(UPLOAD_FOLDER+str(NameofFile)+".csv")
	return recive
@app.route('/rawdata')
def api_raw():
	store_data=rd.readCSV()
	obj_data={}
	obj_data['data']=store_data
	return jsonify(obj_data)
@app.route('/api/fpgrowth')
def api_fp():
	#read url parameters min sup and min conf
	minsup = request.args.get('minsup',type = float)
	minconf = request.args.get('minconf',type = float)
	#read file csv in folder container
	store_data=rd.readCSV()
	result_fpgrowth= fp.fpgrowth(store_data,minsup,minconf)
	return jsonify(result_fpgrowth)
@app.route('/api/apiori')
def api_ap():
	#read url parameters min sup and min conf
	minsup = request.args.get('minsup',type = float)
	minconf = request.args.get('minconf',type = float)
	#read file csv in folder container
	dataFileName=rd.readCSV()
	store_data = rd.readCSV()
	result_apyori = ap.apyori_ar(store_data,minsup,minconf)
	return jsonify(result_apyori)
# @app.route('/api/kmean')
# def api_kmean():
# 	return 'kmean'
app.run(debug = True)
flask_cors.CORS(app, expose_headers='Authorization')