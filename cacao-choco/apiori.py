import numpy as np 
import matplotlib.pyplot as plt
import pandas as pd
from apyori import apriori
import json

def apyori_ar(dataset,minsup=0.045,minconf=0.7,minlen=4):
    minsupport=minsup*0.01
    associantion_rules = apriori(dataset,  min_support=minsupport, min_confidence=minconf, min_lift=3, min_length=minlen)  
    association_results=list(associantion_rules)
    data = {}
    arr= []
    for item in association_results:

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
    data["min_sup"]= minsup
    data["min_conf"]=minconf
    data["min_len"]=minlen
    return data