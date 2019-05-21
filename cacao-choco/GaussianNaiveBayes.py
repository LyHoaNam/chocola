import csv
import copy
import numpy as np
from sklearn.naive_bayes import GaussianNB
def inputData(filename):
    df=csv.reader(open(filename,"rt"))
    next(df, None)
    dataset=list(df)
    for i in range(len(dataset)):
        dataset[i]=[float(x) for x in dataset[i]]
    return dataset

def getClass(dataset):
    temp=copy.deepcopy(dataset)
    classOfData=[]
    for i in range(len(temp)):
        vector=temp[i]
        classOfData.append(vector[-1])
    return classOfData

def getFeature(dataset):
    temp=copy.deepcopy(dataset)
    FeatureOfData=[]
    for i in range(len(temp)):
        vector=temp[i]
        remove_last=vector.pop(-1)
        FeatureOfData.append(vector)
    return FeatureOfData

#param: testdata (array)
def predict(filename,testdata):
    data=inputData(filename)
    X=np.array(getFeature(data))
    y=np.array(getClass(data))
    clf=GaussianNB()
    clf.fit(X,y)
    GaussianNB(priors=None, var_smoothing=1e-09)
    return clf.predict(testdata)
filename="/Test Algoritms/pima-indians-diabetes.csv"
testdata=[[1.0, 93.0, 70.0, 31.0, 0.0, 30.4, 0.315, 23.0]]
print(predict(filename,testdata))