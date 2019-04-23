from flask import Flask, render_template, request
from flask_cors import CORS
from flask import request, jsonify
import pandas as pd
import urllib.request
# import fpgrowth algorthm
import fp_growth as fp
# import apiori algorthm
import apiori as ap
import kmean as km
import readData as rd
# Where to save file
UPLOAD_FOLDER = './container/'
# import CountFile module
import countfile as file
import readitem as item
import predit.predit as pred
import account.login as lg

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config["DEBUG"] = True


@app.route('/')
def home():
  return 'home'

# get file upload


@app.route('/api', methods=['POST', 'GET'])
def result():

    # Count file in folder container
  NameofFile = file.CountofFile() + 1
  recive = "null"
  if request.method == "POST":
    recive = request.files["key"]
    recive.save(UPLOAD_FOLDER + str(NameofFile) + ".csv")
  return recive

# read raw data


@app.route('/rawdata')
def api_raw():
	file_name = ''
	if request.method =="POST":
		file_name = request.form['iddata']
	store_data=rd.readCSV(file_name)
	obj_data={}
	obj_data['data']=store_data
	return jsonify(obj_data)


@app.route('/api/fpgrowth')
def api_fp():
	file_name = ''
	if request.method =="POST":
		file_name = request.form['iddata']
	#read url parameters min sup and min conf
	minlen = request.args.get('minlen',type = float)
	minconf = request.args.get('minconf',type = float)
	#read file csv in folder container
	store_data=rd.readCSV(file_name)
	result_fpgrowth= fp.fpgrowth(store_data,minlen,minconf)
	return jsonify(result_fpgrowth)

#run algorthm apiori
@app.route('/api/apiori')
def api_ap():
	file_name = ''
	if request.method =="POST":
		file_name = request.form['iddata']
	#read url parameters min sup and min conf
	minsup = request.args.get('minsup',type = float)
	minconf = request.args.get('minconf',type = float)
	minlen = request.args.get('minlen',type = float)
	#read file csv in folder container
	store_data = rd.readCSV(file_name)
	result_apyori = ap.apyori_ar(store_data,minsup,minconf,minlen)
	return jsonify(result_apyori)


@app.route('/api/kmean/k', methods=['POST'])
def api_optimum_cluster():
    col1 = request.args.get('col1', type=int)
    col2 = request.args.get('col2', type=int)
    result_optimum_cluster = km.defineOptimumCluster(col1, col2)
    return jsonify(result_optimum_cluster)


@app.route('/api/kmean/c', methods=['POST'])
def api_kmean():
	# them phan xuat bieu do line nha a
	# result_optimum_cluster=km.defineOptimumCluster()
	col1=request.args.get('col1',type=int)
	col2=request.args.get('col2',type=int)
	parameter = request.args.get('parameter', type = int)
	result_kmean=km.defineClusters(parameter,col1,col2)
	return jsonify(result_kmean)

# return list item of data


@app.route('/returnitem')
def api_item():
   # get unique item of database
  items = item.uniqueitem()
  return jsonify(items)


@app.route('/api/knnbasic')
def api_knn():
    # get parameter form url
  user = request.args.get('user', type=str)
  item = request.args.get('item', type=str)
  rati = request.args.get('rati', type=str)
  idd = request.args.get('idd')
  iid = request.args.get('iid')
  # call fuction knnbasic algorthm
  result = pred.AlKNNBasic(user, item, rati, idd, iid)
  return jsonify(result)


@app.route('/api/uniqueuser')
def api_uniqueUser():
  user = request.args.get('user', type=str)
  Uniqueuser = pred.UniqueItem(user)
  return jsonify(Uniqueuser)


@app.route('/api/uniqueitem')
def api_uniqueItem():
	item = request.args.get('item',type = str)
	Uniqueitem = pred.UniqueItem(item)
	return jsonify(Uniqueitem)

	#create account
@app.route('/api/createaccount',methods=['POST', 'GET'])
def api_createaccount():
	username = ""
	password = ""
	username = request.form['user']
	password = request.form['pass']
	if lg.create_account(username,password):
		return 'true'
	return 'false'
		
#login account
@app.route('/api/login', methods=['POST', 'GET'])
def api_login():
	username = ""
	password = ""
	username = request.form['user']
	password = request.form['pass']
    #check in database
	result = ''
	if lg.check_account(username,password):
		result = lg.check_account(username,password)
		return jsonify(result)
	return 'false'



app.run(debug = True)
flask_cors.CORS(app, expose_headers='Authorization')
