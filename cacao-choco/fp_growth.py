import pyfpgrowth as fp

def fpgrowth(records, minlen=4,minconf=0.7):
	#get len want to show 
	patterns = fp.find_frequent_patterns(records, minlen)
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
	data["min_sup"]= ''
	data["min_len"]=minlen
	data["min_conf"]=minconf
	return data
