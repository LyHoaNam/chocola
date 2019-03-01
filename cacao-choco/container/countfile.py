import os, os.path
def CountofFile():
	DIR = '.'	
	return (len([name for name in os.listdir(DIR) if os.path.isfile(os.path.join(DIR, name))]))