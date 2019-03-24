#importing the libraries
import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
import pandas as pd
import sys
from random import randint
import json
#importing the Iris dataset with pandas
def inputData():
	dataset = pd.read_csv('D:/KhoaLuanTotNghiep/source/chocola/cacao-choco/Iris.csv')
	x = dataset.iloc[:, [1, 2, 3, 4]].values
	return x

# Finding the optimum number of clusters for k-means classification
def defineOptimumCluster(data):
	wcss = []
	for i in range(1, 11):
	    kmeans = KMeans(n_clusters = i, init = 'k-means++', max_iter = 300, n_init = 10, random_state = 0)
	    kmeans.fit(data)
	    wcss.append(kmeans.inertia_)

	    #Plotting the results onto a line graph, allowing us to observe 'The elbow'
	plt.plot(range(1, 11), wcss)
	plt.title('The elbow method')
	plt.xlabel('Number of clusters')
	plt.ylabel('WCSS') #within cluster sum of squares
	plt.show()
	return ''
	

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
def defineClusters(n,data):
	x=inputData()
	kmeans = KMeans(n_clusters = n, init = 'k-means++', max_iter = 300, n_init = 10, random_state = 0)
	y_kmeans = kmeans.fit_predict(x)
	colors = initColors(n)
	
	#Visualising the clusters
	for i in range(n):
		plt.scatter(x[y_kmeans == i, 0], x[y_kmeans == i, 1], s = 100, c = colors[i], label = 'Iris-setosa')

	#Plotting the centroids of the clusters
	plt.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:,1], s = 100, c = 'yellow', label = 'Centroids')
	plt.legend()
	plt.show()



    

