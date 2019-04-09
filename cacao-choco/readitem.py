import pandas as pd 
UPLOAD_FOLDER = './container/'
import countfile as file

DataFileName= "./container/"+str(file.CountofFile()+1)+".csv"
store_data = pd.read_csv(DataFileName, keep_default_na=False)
count_col=store_data.shape[0]
count_row= store_data.shape[1]
def uniqueitem():
	arr = []
	for i in range(0,count_row):
		#get unique of column
		temp=store_data.iloc[:,i].unique().tolist()
		arr=arr+temp
	result=pd.unique(arr)
	#result will have nan value.
	#Nan value can drop in frontend
	return result.tolist()