import os, os.path

def CountofFile():
	DIR = './container'	
	return (len([name for name in os.listdir(DIR) if os.path.isfile(os.path.join(DIR, name))]))
print (CountofFile())