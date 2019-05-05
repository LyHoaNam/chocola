from surprise import KNNBasic
from surprise import Dataset,Reader
import pandas as pd
#read data with max number
import countfile as file

def getData(namefile):
	UPLOAD_FOLDER ='./container/'
	DataFileName= UPLOAD_FOLDER+namefile
	dt = pd.read_csv(DataFileName)
	return dt
def AlKNNBasic(namefile,uid,iid,rati,value_uid,value_iid):
	test_data=pd.read_csv('./container/'+namefile)
	dt=pd.DataFrame(test_data)
	# Retrieve the trainset.
	reader= Reader(rating_scale=(0,100))
	data= Dataset.load_from_df(dt[[uid, iid,rati ]], reader)
	trainset = data.build_full_trainset()
	algo = KNNBasic()
	algo.fit(trainset)
	pred = algo.predict(int(value_uid), int(value_iid), r_ui=1, verbose=True)
	#return result to json
	jsondata={}
	tempdata={}
	tempdata["user"]=pred.uid
	tempdata["item"]=pred.iid
	tempdata["predit"]=pred.est
	jsondata["KNNBasic"]=tempdata
	return jsondata

def UniqueItem(item,namefile):
	dt=getData(namefile)
	return dt[item].unique().tolist()