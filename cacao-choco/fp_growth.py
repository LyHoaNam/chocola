import pyfpgrowth as fp

def fpgrowth(dataset, minsup=4,minconf=0.7):
	#convert Dataframe to Array
	records = []
	for i in range(0,7501):
		temps = []
		for j in range(0,20):
			if (dataset.values[i,j] == ''):
				break	
			else:
	 			temps.append(str(dataset.values[i,j]))
		records.append(temps)

	patterns = fp.find_frequent_patterns(records, minsup)
	rules = list(fp.generate_association_rules(patterns, minconf))
	data = {}
	arr =[]
	i=0
	while i< (len(rules)-1) :
		values ={}
		values["fist"] = rules[i]
		i+=1
		values["next"]=rules[i]
		i+=1
		arr.append(values)
	data["rules"]=arr
	data["min_sup"]= minsup
	data["min_conf"]=minconf
	
	return data
