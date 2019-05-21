import uuid
import datetime
import pandas as pd
from app.main import db
from app.main.model.data import Data


def save_new_data(id_u,data_name):
    userid = Data.query.filter_by(id_user=id_u).first()
    if not userid:
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

def convert_to_json(store_data):
    count_row = store_data.shape[0]
    count_col = store_data.shape[1]
    #convert Dataframe to Array
    result = {}
    result['status'] = 'success'
    records = []
    for i in range(0,count_row):
        temps = []
        for j in range(0,count_col):
            if (store_data.values[i,j] == ''):
                break	
            else:
                temps.append(str(store_data.values[i,j]))
        records.append(temps)
    result['data'] = records
    return result
    
def read_data_csv(u_id,page):
    file_name = get_a_data(u_id)
    DataFileName= "./container/"+str(file_name)
    try:
        if page == 0:
            store_data = pd.read_csv(DataFileName, 
            keep_default_na = False,
            header=None,
            nrows=50)
            result = convert_to_json(store_data)
            return result
        else:
            store_data = pd.read_csv(DataFileName, 
            keep_default_na = False,
            skiprows=[i for i in range(1,page*50)],
            nrows=50)
            result = convert_to_json(store_data)
            return result
            

    except Exception as e:
        response_object = {
            'status': 'fail',
            'message': 'Some error occurred. Please try again.'
        }
        return response_object, 401

def read_all_data_csv(u_id):
    file_name = get_a_data(u_id)
    DataFileName= "./container/"+str(file_name)
    try:
        store_data = pd.read_csv(DataFileName, 
        keep_default_na = False)
        result = convert_to_json(store_data)
        return result    

    except Exception as e:
        response_object = {
            'status': 'fail',
            'message': 'Some error occurred. Please try again.'
        }
        return response_object, 401