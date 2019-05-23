from sklearn.cluster import KMeans
import pandas as pd
import sys
import json
from random import randint

class Cluster:
    def __init__(self, data_file_name, col1, col2):
        """
        Association Rule - Fpgrowth
        """
        self.data_file_name = data_file_name
        self.col1 = col1
        self.col2 = col2
    def input_data(self):
        UPLOAD_FOLDER = '../../../container/'
        url = UPLOAD_FOLDER + self.data_file_name

        dt = pd.read_csv(url
        ,usecols = [self.col1,self.col2])
        dt = dt.dropna()
        return dt
        
    def define_optimum_cluster(self):
        arr = []
        for i in range(1,15):
            obj = {}
            kmean = KMeans(n_clusters=i)
            kmean.fit(self.input_data())
            arr.append(round(kmean.inertia_,2))
        return arr

    def finds_optimum(self):
        records = self.define_optimum_cluster()
        sums = 0
        between = []
        for i in range(len(records)):
            sums = sums + records[i]
            if i+1 != len(records):
                between_ss = abs(records[i+1] - records[i])
                between.append(between_ss)
                print('k: ',between_ss/sums)
        print('sum: ',sum)
        print(between)

    def convert_to_json(self):
        data = {}
        arr = []
        records = self.define_optimum_cluster()
        for i in records:
            obj = {}
            obj['x'] = i
            obj['y'] = records[i]
            arr.append(obj)
        data["line"]=arr
        return data
test = Cluster('test_cl.csv','Channel','Region')
print (test.finds_optimum())