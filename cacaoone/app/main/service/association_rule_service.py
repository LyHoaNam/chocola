import pyfpgrowth as fp
from apyori import apriori
import pandas as pd
import operator
import json
class Fpgrowth:
    def __init__(self, records, min_len, min_conf):
        """
        Association Rule - Fpgrowth
        """
        self.records = records
        self.min_len = min_len
        self.min_conf = min_conf
    def requent_patterns(self):
        data = self.records
        minlen = int(self.min_len)
        patterns = fp.find_frequent_patterns(data, minlen)
        return patterns
    def generate_rule(self):
        data = self.requent_patterns()
        minconf = self.min_conf
        rules = list(fp.generate_association_rules(data, minconf))
        return rules
    def write_json(self):
        rules = list(self.generate_rule())
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
        data["min_len"]=self.min_len
        data["min_conf"]=self.min_conf
        return data
    def sort_patteerns(self):
        data = self.requent_patterns()
        sorted_data = sorted(data.items(), key=lambda kv: kv[1])
        return json.dumps(sorted_data)

class Apiori:
    def __init__(self, records, min_len, min_sup, min_conf):
        """
        Association Rule - Fpgrowth
        """
        self.records = records
        self.min_len = min_len
        self.min_sup = min_sup
        self.min_conf = min_conf
    def generate_rule(self):
        data = self.records
        minconf = self.min_conf
        minsup = self.min_sup
        minlen = self.min_len
        rules = apriori(data,  min_support=minsup, 
        min_confidence=minconf, 
        min_lift=3, 
        min_length=minlen)  
        return rules
    def write_json(self):
        rules = list(self.generate_rule())
        data = {}
        arr= []
        for item in rules:

        # first index of the inner list
        # Contains base item and add item
            values = {}
            pair = item[0] 
            items = [x for x in pair]
            values["fist"] = [items[0]]
            values["next"] = [items[1]]
            #values["Support"] = str(item[1])
            #values["Confidence"] = str(item[2][0][2])
            #values["Lift"] = str(item[2][0][3])
            arr.append(values)
        data["rules"]= arr
        data["min_sup"]= self.min_sup
        data["min_conf"] = self.min_conf
        data["min_len"] =  self.min_len
        return data