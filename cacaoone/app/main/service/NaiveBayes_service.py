import pandas as pd
import copy
import numpy as np
from sklearn.naive_bayes import GaussianNB
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn import preprocessing
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
class _GaussianNB(object):
    def __init__(self, dataset, test_size, random_state):
        self.dataset=dataset
        self.test_size=test_size
        self.random_state=random_state
        self.x_test=[]
        self.y_test=[]
        self.x_train=[]
        self.y_train=[]
        self.prediction=[]
        self.accuracy=0
    #SET function
    def setx_train(self,x_train):
        self.x_train=x_train

    def sety_train(self,y_train):
        self.y_train=y_train

    def setx_test(self,x_test):
        self.x_test=x_test

    def sety_test(self,y_test):
        self.y_test=y_test

    def set_prediction(self, pred):
        self.prediction=pred

    def set_accuracy(self, acc):
        self.accuracy=acc
    #GET function
    def getx_train(self):
        return self.x_train

    def gety_train(self):
        return self.y_train

    def getx_test(self):
        return self.x_test

    def gety_test(self):
        return self.y_test

    def get_prediction(self):
        return self.prediction

    def get_accuracy(self):
        return self.accuracy

    def preProcessData(self):
        labelEncode=preprocessing.LabelEncoder()
        df=pd.read_csv(self.dataset, sep='\t')
        status=df.iloc[:,-1]
        status_label=labelEncode.fit_transform(status)
        return status_label

    def processData(self):
        data=pd.read_csv(self.dataset)
        X=data.iloc[:,:-1]
        y=self.preProcessData()#data.iloc[:,-1]
        x_train, x_test, y_train, y_test=train_test_split(X,y, test_size=self.test_size, random_state=self.random_state)
        self.setx_train(x_train)
        self.sety_train(y_train)
        self.setx_test(x_test)
        self.sety_test(y_test)
        
    def predict(self):
        clf=GaussianNB()
        clf.fit(self.getx_train(),self.gety_train())
        GaussianNB(priors=None, var_smoothing=1e-09)
        self.set_prediction(clf.predict(self.getx_test()))

    def calAccuracy(self):
        pred=self.get_prediction()
        actual=np.array(self.gety_test())
        count=0
        for i in range(len(pred)):
            if(pred[i]==actual[i]):
                count=count+1
        self.set_accuracy(count/len(pred))
    def write_json(self):
        result={}
        self.processData()
        self.predict()
        self.calAccuracy()
        result['predict']=list(self.get_prediction())
        result['Accuracy']=self.get_accuracy()
        return result
if __name__ == "__main__":
    data = '/Test Algoritms/pima-indians-diabetes.csv'
    Gauss=_GaussianNB(data,test_size=0.33,random_state=42 )
    print(Gauss.write_json())

class _MultinomialNB(object):
    def __init__(self, dataset, test_size, random_state):
        self.dataset=dataset
        self.test_size=test_size
        self.random_state=random_state
        self.x_train=[]
        self.y_train=[]
        self.x_test=[]
        self.y_test=[]
        self.prediction=[]
        self.accuracy=0
    #SET function
    def setx_train(self,x_train):
        self.x_train=x_train

    def sety_train(self,y_train):
        self.y_train=y_train

    def setx_test(self,x_test):
        self.x_test=x_test

    def sety_test(self,y_test):
        self.y_test=y_test

    def set_prediction(self, pred):
        self.prediction=pred
    def set_accuracy(self, acc):
        self.accuracy=acc
    #GET function
    def getx_train(self):
        return self.x_train

    def gety_train(self):
        return self.y_train

    def getx_test(self):
        return self.x_test

    def gety_test(self):
        return self.y_test

    def get_prediction(self):
        return self.prediction
    def get_accuracy(self):
        return self.accuracy

    def preProcessData(self):
        labelEncode=preprocessing.LabelEncoder()
        df=pd.read_csv(self.dataset, sep='\t',names=['Status','Message'])
        status=df["Status"]
        status_label=labelEncode.fit_transform(status)
        return status_label

    def processData(self):
        
        df=pd.read_csv(self.dataset, sep='\t',names=['Status','Message'])
        # df.loc[df["Status"]=='ham',"Status"] = 1 #access a group of row and columns by label
        # df.loc[df["Status"]=='spam',"Status"] = 0 #access a group of row and columns by label
        df_x=df["Message"] #get rows of message
        df_y=df["Status"]=self.preProcessData() # get rows of Status
        tfidf=TfidfVectorizer(min_df=1, stop_words='english')
        X_train, X_test, y_train, y_test=train_test_split(df_x,df_y, test_size=0.2, random_state=4)
        x_train_tfidf=tfidf.fit_transform(X_train)
        x_test_tfidf=tfidf.transform(X_test)
        # print(x_test_tfidf)
        # a=x_train_tfidf.toarray()
        self.setx_train(x_train_tfidf)
        self.sety_train(y_train)
        self.setx_test(x_test_tfidf)
        self.sety_test(y_test)
        # return x_train_tfidf,y_train,x_test_tfidf,y_test
    def predict_Multi(self):
        mnb=MultinomialNB()
        # self.processData()
        y_train=self.gety_train().astype('int')
        mnb.fit(self.getx_train(),y_train)
        self.set_prediction(mnb.predict(self.getx_test()))
        # spamEncode=labelEncode.fit_transform(status)
        # print(spamEncode)
    def calAccuracy(self):
        pred=self.get_prediction()
        actual=np.array(self.gety_test())
        count=0
        for i in range(len(pred)):
            if(pred[i]==actual[i]):
                count=count+1
        self.set_accuracy(count/len(pred))
    def write_json(self):
        result={}
        self.processData()
        self.predict_Multi()
        self.calAccuracy()
        result['y_test']=list(self.gety_test())
        result['y_predict']=list(self.get_prediction())
        result['Accuracy']=self.get_accuracy()
        return result

if __name__ == "__main__":
    path='/Test Algoritms/smsspam.csv'
    mnb=_MultinomialNB(path,0.33,42)
    # mnb.preProcessData()
    print(mnb.write_json())