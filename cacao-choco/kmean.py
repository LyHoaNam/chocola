#importing the libraries
import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
import pandas as pd
import sys
from random import randint
import json
import countfile as file
#importing the Iris dataset with pandas
def inputData():
	#read data with max number
	UPLOAD_FOLDER ='./container/'
	DataFileName= UPLOAD_FOLDER+str(file.CountofFile()+1)+".csv"
	dt = pd.read_csv(DataFileName)
	dt= dt.dropna()
	x = dt.iloc[:, [0, 1]].values
	return x

# Finding the optimum number of clusters for k-means classification
def defineOptimumCluster():
	data ={}
	wcss = []
	for i in range(1, 11):
	    kmeans = KMeans(n_clusters = i, init = 'k-means++', max_iter = 300, n_init = 10, random_state = 0)
	    kmeans.fit(inputData())
	    wcss.append(kmeans.inertia_)

	    #Plotting the results onto a line graph, allowing us to observe 'The elbow'
	# plt.plot(range(1, 11), wcss)
	# plt.title('The elbow method')
	# plt.xlabel('Number of clusters')
	# plt.ylabel('WCSS') #within cluster sum of squares
	# plt.show()
	data["line"]=wcss
	return data
	

#initialize colors
#param n: number of cluster/k
#return array of colors
#
def initColors(n):
	colors=[]
	for i in range(n):
	    colors.append('#%06X' % randint(0,0xFFFFFF ))
	    if colors[i]=='#FFFF00':
	    	i+=1
	    	continue
	return colors

#Applying kmeans to the dataset / Creating the kmeans classifier
#
#define clusters
#param	n: number of K after optimazing
#param  data: data of training
#return void
def convertToJson():
	a=[1,2,3]
	b=[[4,5],[6,7]]
	# c=[]
	# d=len(a)
	# # for i in range(d):
	# c.append((a[1],b[1]))
	
	# data={}
	# data["data"]=c
	for i in range(2):
		for x in b[i]:
			print(x)
	return ''
def defineClusters(n):
	data={}
	x=inputData()
	kmeans = KMeans(n_clusters = n, init = 'k-means++', max_iter = 300, n_init = 10, random_state = 0)
	y_kmeans = kmeans.fit_predict(x)
	colors = initColors(n)
	arr=[]
	#Visualising the clusters
	
	pointX=[]
	pointY=[]
	for i in range(n):
		values={}
		c=[]
		
		values["name"]="Ten cua loai "+str(i)
		pointX=np.array((x[y_kmeans==i,0]))
		pointY=np.array((x[y_kmeans==i,1]))
		# size=len(pointX[i])
		# for x in pointY[i]:
		# 	print(x)
			# print("------------------")
		# c.append()
		# arr.append(values)
		z=np.array((pointX,pointY)).T

		values["data"]=z.tolist()
		arr.append(values)
	# c=[]
	# sizeArr=len(pointX)

	# 	c.append((pointX[i],pointY[i]))
	data["ScatterPlot"]=arr


	return data
		# plt.scatter(x[y_kmeans == i, 0], x[y_kmeans == i, 1], s = 100, c = colors[i], label = 'Iris-setosa')


	#Plotting the centroids of the clusters
	# plt.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:,1], s = 100, c = 'yellow', label = 'Centroids')
	# plt.legend()
	# plt.show()

# print(convertToJson())
# print(defineClusters(3))
#defineClusters(5,inputData())


    

