import pandas as pd

#import CountFile module
import importlib.util
UPLOAD_FOLDER = './container/'
spec = importlib.util.spec_from_file_location("module.name", UPLOAD_FOLDER+"/countfile.py")
foo = importlib.util.module_from_spec(spec)
spec.loader.exec_module(foo)

#data for association rule algorithm
def readCSV():
	#read fiel csv at folder container with a max (number) name
	DataFileName= "./container/"+str(foo.CountofFile()+1)+".csv"
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


