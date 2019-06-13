from app.library.pyfpgrowth import (generate_association_rules, 
find_frequent_patterns, generate_confidence)
from app.library.apyori import apriori
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
        patterns = find_frequent_patterns(data, minlen)
        return patterns
    def generate_rule(self):
        data = self.requent_patterns()
        minconf = self.min_conf
        rules = generate_association_rules(data, minconf)
        return rules
    def sort_patteerns(self):
        data = self.requent_patterns()
        sorted_data = sorted(data.items(), key=lambda kv: kv[1]
        , reverse=True)
        result = []
        if (len(sorted_data)>10):
            result = sorted_data[0:10]
        else:
            result = sorted_data
        return json.dumps(result)
class Apiori:
    def __init__(self, records, min_sup, min_conf):
        """
        Association Rule - Fpgrowth
        """
        self.records = records
        self.min_sup = min_sup
        self.min_conf = min_conf
    def generate_rule(self):
        data = self.records
        minconf = self.min_conf
        minsup = self.min_sup
        rules = apriori(data,  min_support=minsup, 
        min_confidence=minconf, 
        min_lift=1, 
        min_length=100)  
        return rules
    def write_json(self):
        rules = list(self.generate_rule())
        data = {}
        arr= []
        len_of_rule = 0
        for item in rules:
            len_of_rule += 1
            values = {}
            values["left"] = [x for x in item[2][0][0]]
            values["right"] = [x for x in item[2][0][1]]
            values["conf"] = round(item[2][0][2],2)
            arr.append(values)
        data["rules"] = arr
        data["len"] = len_of_rule 
        return data