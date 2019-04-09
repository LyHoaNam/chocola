from surprise import KNNBasic
from surprise import Dataset,Reader
import pandas as pd
import countfile as file

UPLOAD_FOLDER ='./container/'
DataFileName= UPLOAD_FOLDER+str(file.CountofFile()+1)+".csv"
dt = pd.read_csv(DataFileName)

def AlKNNBasic(uid,iid,rati,value_uid,value_iid):
	# Retrieve the trainset.
	reader= Reader(rating_scale=(0,100))
	data= Dataset.load_from_df(dt[[uid, iid,rati]], reader)
	trainset = data.build_full_trainset()
	algo = KNNBasic()
	algo.fit(trainset)
	pred = algo.predict(value_uid, value_iid, r_ui=1, verbose=True)
	#return result to json
	jsondata={}
	tempdata={}
	tempdata["user"]=pred.uid
	tempdata["item"]=pred.iid
	tempdata["predit"]=pred.est
	jsondata["KNNBasic"]=tempdata
	return jsondata

def UniqueItem(item):
	return dt[item].unique().tolist()