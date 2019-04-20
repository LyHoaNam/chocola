import pandas as pd
UPLOAD_FOLDER = './container/'
import countfile as file

def readCSV(file_name):
	#read fiel csv at folder container with a max (number) name
	DataFileName= "./container/"+file_name+".csv"
	store_data = pd.read_csv(DataFileName,header=None, keep_default_na=False)
	count_row=store_data.shape[0]
	count_col= store_data.shape[1]
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
