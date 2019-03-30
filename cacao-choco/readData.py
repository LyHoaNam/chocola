import pandas as pd
UPLOAD_FOLDER = './container/'
import countfile as file

DataFileName= "./container/"+str(file.CountofFile()+1)+".csv"
store_data = pd.read_csv(DataFileName,header=None, keep_default_na=False)
count_row=store_data.shape[0]
count_col= store_data.shape[1]
#data for association rule algorithm
def readCSV():
	#read fiel csv at folder container with a max (number) name

	#convert Dataframe to Array
	records = []
	for i in range(0,count_row):
		temps = []
		for j in range(0,count_col):
			if (store_data.values[i,j] == ''):
				break	
			else:
	 			temps.append(str(store_data.values[i,j]))
		records.append(temps)
	return records
def lenOfRow():
	return count_row

