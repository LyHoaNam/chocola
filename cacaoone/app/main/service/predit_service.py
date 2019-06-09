from surprise import KNNBasic, NMF, SlopeOne
from surprise import Dataset,Reader
import pandas as pd
import ast
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
    def from_to(self,namefile,uid,iid,rati,from_uid,to_uid,from_iid,to_iid):
        test_data=pd.read_csv('./container/'+namefile)
        dt=pd.DataFrame(test_data)
        # Retrieve the trainset.
        reader= Reader(rating_scale=(0,100))
        data= Dataset.load_from_df(dt[[uid, iid,rati ]], reader)
        trainset = data.build_full_trainset()
        algo = KNNBasic()
        algo.fit(trainset)

        jsondata = {}
        arr = []
        for value_uid in range(from_uid,to_uid):
            for value_iid in range(from_iid,to_iid):
                pred = algo.predict(value_uid, value_iid, r_ui=1, verbose=True)
                tempdata=[]
                tempdata.append(pred.uid)
                tempdata.append(pred.iid)
                tempdata.append(round(pred.est,2))
                arr.append(tempdata)
        jsondata["KNNBasic"]=arr
        #return result to json
        return jsondata

    def unique_column(self,col,name_dt):
        UPLOAD_FOLDER ='./container/'
        DataFileName= UPLOAD_FOLDER+name_dt
        dt = pd.read_csv(DataFileName)
        return dt[col].unique().tolist()
    
    def chart_of_value(self,namefile,uid,iid,rati,uid_value):
        UPLOAD_FOLDER ='./container/'
        DataFileName= UPLOAD_FOLDER + namefile
        raw_dt = pd.read_csv(DataFileName)
        dt = raw_dt[[uid, iid,rati]]
        is_value = dt[uid]  == uid_value
        result = dt[is_value]
        sort_result = result[[iid,rati]].sort_values(by=[iid])
        chart_value = sort_result.rename(index=str, columns={iid: "x", rati: "y"})
        result_to_json = chart_value.to_json(orient='records')
        result_to_arr = ast.literal_eval(result_to_json)
        return result_to_arr

    def read_data_csv(self,namefile,page,uid,iid,rati):
        DataFileName= "./container/"+str(namefile)
        data_col_cho = ''
        if page == 0:
            store_data = pd.read_csv(DataFileName, 
            keep_default_na = False,
            header=None,
            nrows=50)
            data_col_cho = store_data
        else:
            store_data = pd.read_csv(DataFileName, 
            keep_default_na = False,
            skiprows=[i for i in range(1,page*50)],
            nrows=50)
            data_col_cho = store_data[[uid, iid,rati]]
        return ast.literal_eval(data_col_cho.to_json(orient='values'))
    def nmf(self,namefile,uid,iid,rati,value_uid,value_iid):
        test_data=pd.read_csv('./container/'+namefile)
        dt=pd.DataFrame(test_data)
        # Retrieve the trainset.
        reader= Reader(rating_scale=(0,100))
        data= Dataset.load_from_df(dt[[uid, iid,rati ]], reader)
        trainset = data.build_full_trainset()
        algo = NMF()
        algo.fit(trainset)
        pred = algo.predict(int(value_uid), int(value_iid), r_ui=1, verbose=True)
        #var_rmse = accuracy.rmse(pred)
        #return result to json
        jsondata={}
        tempdata={}
        tempdata["uid"]=pred.uid
        tempdata["idd"]=pred.iid
        tempdata["rati"]=round(pred.est,2)
        jsondata["NMF"]=tempdata
        return jsondata
    
    def nmf_from_to(self,namefile,uid,iid,rati,from_uid,to_uid,from_iid,to_iid):
        test_data=pd.read_csv('./container/'+namefile)
        dt=pd.DataFrame(test_data)
        # Retrieve the trainset.
        reader= Reader(rating_scale=(0,100))
        data= Dataset.load_from_df(dt[[uid, iid,rati ]], reader)
        trainset = data.build_full_trainset()
        algo = NMF()
        algo.fit(trainset)

        jsondata = {}
        arr = []
        for value_uid in range(from_uid,to_uid):
            for value_iid in range(from_iid,to_iid):
                pred = algo.predict(value_uid, value_iid, r_ui=1, verbose=True)
                tempdata=[]
                tempdata.append(pred.uid)
                tempdata.append(pred.iid)
                tempdata.append(round(pred.est,2))
                arr.append(tempdata)
        jsondata["NMF"]=arr
        #return result to json
        return jsondata
    def SlopeOne(self,namefile,uid,iid,rati,value_uid,value_iid):
        test_data=pd.read_csv('./container/'+namefile)
        dt=pd.DataFrame(test_data)
        # Retrieve the trainset.
        reader= Reader(rating_scale=(0,100))
        data= Dataset.load_from_df(dt[[uid, iid,rati ]], reader)
        trainset = data.build_full_trainset()
        algo = SlopeOne()
        algo.fit(trainset)
        pred = algo.predict(int(value_uid), int(value_iid), r_ui=1, verbose=True)
        #var_rmse = accuracy.rmse(pred)
        #return result to json
        jsondata={}
        tempdata={}
        tempdata["uid"]=pred.uid
        tempdata["idd"]=pred.iid
        tempdata["rati"]=round(pred.est,2)
        jsondata["SlopeOne"]=tempdata
        return jsondata
    
    def SlopeOne_from_to(self,namefile,uid,iid,rati,from_uid,to_uid,from_iid,to_iid):
        test_data=pd.read_csv('./container/'+namefile)
        dt=pd.DataFrame(test_data)
        # Retrieve the trainset.
        reader= Reader(rating_scale=(0,100))
        data= Dataset.load_from_df(dt[[uid, iid,rati ]], reader)
        trainset = data.build_full_trainset()
        algo = SlopeOne()
        algo.fit(trainset)

        jsondata = {}
        arr = []
        for value_uid in range(from_uid,to_uid):
            for value_iid in range(from_iid,to_iid):
                pred = algo.predict(value_uid, value_iid, r_ui=1, verbose=True)
                tempdata=[]
                tempdata.append(pred.uid)
                tempdata.append(pred.iid)
                tempdata.append(round(pred.est,2))
                arr.append(tempdata)
        jsondata["SlopeOne"]=arr
        #return result to json
        return jsondata