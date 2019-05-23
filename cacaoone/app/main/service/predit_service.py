import pyfpgrowth as fp
from apyori import apriori
from surprise import KNNBasic
from surprise import Dataset,Reader
import pandas as pd
class Predit:
    def getData(namefile):
        UPLOAD_FOLDER ='./container/'
        DataFileName= UPLOAD_FOLDER+namefile
        dt = pd.read_csv(DataFileName)
        return dt
    def alknnbasic(self,namefile,uid,iid,rati,value_uid,value_iid):
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
        tempdata["uid"]=pred.uid
        tempdata["idd"]=pred.iid
        tempdata["rati"]=round(pred.est,2)
        jsondata["KNNBasic"]=tempdata
        return jsondata

    def unique_column(self,col,name_dt):
        UPLOAD_FOLDER ='./container/'
        DataFileName= UPLOAD_FOLDER+name_dt
        dt = pd.read_csv(DataFileName)
        return dt[col].unique().tolist()
