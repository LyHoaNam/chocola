import uuid
import datetime
import pandas as pd
from app.main import db
from app.main.model.data import Data
import json

def save_new_data(id_u,data_name):
    userid = Data.query.filter_by(id_user=id_u).first()
    if userid:
        response_object = {
            'status': 'fail',
            'message': 'User already exists. Please Log in.'
        }
        return response_object, 409
    else:
        new_data = Data(
            data_name=data_name,
            id_user=id_u,
            selected=True
        )
        save_changes(new_data)
        response_object = {
            'status': 'success',
            'message': 'Successfully registered.'
        }
        return response_object, 201

def get_all_data(u_id):
    return Data.query.filter_by(id_user=u_id).all()


def get_a_data(public_id):
    return Data.query.filter_by(id_user=public_id,selected=True).first()

def update_unselected(u_id):
    try:
        #update table Data -> all selected to false
        Data.query.filter_by(id_user=u_id).update({Data.selected:False})
        db.session.commit()
        return True
    except Exception as e:
        return False
       
def update_selected_iddata(u_id,d_id):
    try:
        #update selected with data_id
        Data.query.filter_by(id_user=u_id,id_data=d_id['id_data']).update({Data.selected:True})
        db.session.commit()
        response_object = {
            'status': 'success',
            'message': 'Successfully update unselected.'
        }
        return response_object, 201
    except Exception as e:
        response_object = {
            'status': 'fail',
            'message': 'Some error occurred. Please try again.'
        }
        return response_object, 401

def save_changes(data):
    db.session.add(data)
    db.session.commit()

def get_header_csv(u_id,page):
    file_name = get_a_data(u_id)
    DataFileName= "./container/"+str(file_name)
    result = {}
    result['status'] = 'success'
    store_data = pd.read_csv(DataFileName, 
    keep_default_na = False,
    header=None,
    nrows=1)
    result['header'] = store_data.to_json(orient='values')
    return result

def read_data_csv(u_id,page):
    file_name = get_a_data(u_id)
    DataFileName= "./container/"+str(file_name)
    result = {}
    result['status'] = 'success'
    result['nextpage'] = page+1
    try:
        if page == 0:
            store_data = pd.read_csv(DataFileName, 
            keep_default_na = False,
            header=None,
            nrows=50)
            if store_data.shape[0] == 0:
                result['status'] = 'fail'
            result['data'] = store_data.to_json(orient='values')
            return result
        else:
            store_data = pd.read_csv(DataFileName, 
            keep_default_na = False,
            skiprows=[i for i in range(1,page*50)],
            nrows=50)
            if store_data.shape[0] == 0:
                result['status'] = 'fail'
            result['data'] = store_data.to_json(orient='values')
            return result
        

    except Exception as e:
        response_object = {
            'status': 'fail',
            'message': 'Some error occurred. Please try again.'
        }
        return response_object, 401

def read_all_data_csv(u_id,str_te):
    file_name = get_a_data(u_id)
    DataFileName= "./container/"+str(file_name)
    store_data = pd.read_csv(DataFileName)

    arr_sel = str_te.split(',')
    arr_sel = list(map(int, arr_sel))
    select_data = store_data.iloc[:,arr_sel]

    count_row=select_data.shape[0]
    records = []
    for row_index in range(0,count_row):
        row_data = select_data.iloc[row_index].dropna()
        records.append(list(row_data.astype(str)))
    return records

def describe_col_select_cout_value_csv(u_id,arr_raw):
    file_name = get_a_data(u_id)
    DataFileName = "./container/" + str(file_name)
    store_data = pd.read_csv(DataFileName)
    
    arr_sel = arr_raw.get('sel_col').split(',')
    arr_sel = list(map(int, arr_sel))
    select_data = store_data.iloc[:,arr_sel]

    list_of_list = select_data.values.tolist()
    flatten = [item for sublist in list_of_list for item in sublist]
    temp_va = pd.Series(flatten)
    ser_cout = temp_va.value_counts()
    arr_count = ser_cout.to_frame()

    result_des = arr_count.describe()

    value50 = result_des.iloc[5][0]
    value25 = result_des.iloc[4][0]
    value75 = result_des.iloc[6][0]
    count_row=select_data.shape[0]

    minsup = round(value25/count_row,4)
    minconf = round(value25/value75,4)
    
    result = {}
    result['des'] = result_des.T.to_json(orient='index')
    result['minsup'] = minsup
    result['minconf'] = minconf
    return result

def describe_data_csv(u_id):
    file_name = get_a_data(u_id)
    DataFileName = "./container/" + str(file_name)
    #DataFileName = "../../../container/2019_05_24_08_05_3077.csv" #+ str(file_name)
    store_data = pd.read_csv(DataFileName)
    data_describe = store_data.describe().T
    return data_describe.to_json(orient='index')

def describe_count_value_csv(u_id):
    file_name = get_a_data(u_id)
    DataFileName = "./container/" + str(file_name)
    store_data = pd.read_csv(DataFileName,keep_default_na=False)
        
    list_of_list = store_data.values.tolist()
    flatten = [item for sublist in list_of_list for item in sublist]
    temp_va = pd.Series(flatten)
    ser_cout = temp_va.value_counts()
    arr_count = ser_cout.to_frame()

    data_describe = arr_count.describe().T
    return data_describe.to_json(orient='index')

#print(describe_data_csv())


def info_data_csv(u_id):
    file_name = get_a_data(u_id)
    #DataFileName = "../../../container/2019_05_24_08_05_3077.csv" #+ str(file_name)
    DataFileName = "./container/" + str(file_name)
    store_data = pd.read_csv(DataFileName)
    data_info = {}
    data_info['filename'] = str(file_name)
    data_info['unique'] = store_data.nunique().to_json(orient='index')
    data_info['type'] = store_data.get_dtype_counts().to_json(orient='index')
    data_info['shape'] = store_data.shape
    data_info['header'] = list(store_data.columns.values)
    return data_info

def type_data_csv(u_id):
    file_name = get_a_data(u_id)
    #DataFileName = "../../../container/2019_05_24_08_05_3077.csv" #+ str(file_name)
    DataFileName = "./container/" + str(file_name)
    store_data = pd.read_csv(DataFileName)
    data_info = store_data.dtypes.to_frame()
    row = data_info.shape[0]
    records = []
    for i in range(0,row):
        records.append(str(data_info.values[i,0]))
    result = {}
    result['types'] = records
    return result

