from sklearn.cluster import KMeans
import pandas as pd
import numpy as np
from numpy import array
import sys
import imp
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
        UPLOAD_FOLDER = './container/'
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
                print('between: ',between_ss)
        arr_tr = []
        for i in range(len(between)):
            valuex = between[i]/sums
            arr_tr.append(valuex)
        
        print('sum: ',sums)
        print(between)

    def convert_optimum_to_json(self):
        data = {}
        arr = []
        records = self.define_optimum_cluster()
        for i in range(len(records)):
            obj = {}
            obj['x'] = i
            obj['y'] = records[i]
            arr.append(obj)
        data["line"]=arr
        return data
    def define_cluster(self, k_cluster):
        data = self.input_data()
        kmeans = KMeans(n_clusters = k_cluster, init = 'k-means++', 
        max_iter = 300, n_init = 10, random_state = 0)
        result_kmeans = kmeans.fit(data)
        label_k = result_kmeans.labels_
        arr = []
        result = {}
        for i in range(len(data)):
            obj = {}
            obj['type'] = str(label_k[i])
            obj['x'] = data.iloc[i,0]
            obj['y'] = data.iloc[i,1]
            arr.append(obj)
        result['ScatterPlot']=arr
        return result
    def table_cluster(self, k_cluster):
        data = self.input_data()
        kmeans = KMeans(n_clusters = k_cluster, init = 'k-means++', 
        max_iter = 300, n_init = 10, random_state = 0)
        result_kmeans = kmeans.fit(data)
        label_k = result_kmeans.labels_
        arr = []
        for i in range(k_cluster):
            new_arr  = []
            arr.append(new_arr)

        for i in range(len(data)):
            obj = {}
            beginPoint = 0
            while beginPoint != label_k[i] :
                beginPoint +=1
            temp_arr = []
            temp_arr.append(data.iloc[i,0])
            temp_arr.append(data.iloc[i,1])
            arr[beginPoint].append(temp_arr)
       
        return arr
#test = Cluster('Iris.csv','SepalLengthCm','SepalWidthCm')
#print (test.table_cluster(3))