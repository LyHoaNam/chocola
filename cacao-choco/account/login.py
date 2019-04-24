import account.connectdb as db

def check_account(username,password):
	sql_str = """select * from users 
	where username='{}' and 
	pass='{}';""".format(username,password)
	result = db.get_one_row(sql_str)
	if(result):
		values = {}
		values["id"] = result[0]
		values["user"]=result[1]
		values["imgUrl"]=result[3]
		return values
	return False
def create_account(username,password):
	sql_str="""INSERT INTO `users`(`username`, `pass`,`acc_timestamp`) 
	VALUES ('{}','{}',CURRENT_TIMESTAMP);""".format(username,password)
	try:
		db.set_data(sql_str)
	except Erros as e:
		print("False as create account")
		return False
	finally:
		return True
def select_all_row(id_user):
	sql_str= """SELECT `id_data`, `name_data`, 
	`selected` FROM `datafile` WHERE id_user='{}'
	""".format(id_user)
	result = db.get_all_row(sql_str)
	obj={}
	arr=[]
	if(result):
		for row in result:
			values = {}
			values["id_data"] = row[0]
			values["name_data"]=row[1]
			values["selected"]=row[2]
			arr.append(values)
		obj['listdata']=arr
		return obj
	return False
def create_datafile(data_name,id_user):
	sql_str = """INSERT INTO `datafile`
	( `name_data`, `selected`, `id_user`) 
	VALUES ('{}',TRUE,{})""".format(data_name,id_user)
	try:
		db.set_data(sql_str)
	except Erros as e:
		return False
	finally:
		return True
def unselected(id_user):
	sql_str="""
	UPDATE datafile SET selected=FALSE WHERE id_user={} ;
	""".format(id_user)
	try:
		db.set_data(sql_str)
	except Erros as e:
		print("False as create account")
		return False
	finally:
		return True
def set_selected(name_data):
	sql_str="""
	UPDATE `datafile` SET `selected`=TRUE 
	WHERE name_data=''""".format(name_data)
	try:
		db.set_data(sql_str)
	except Erros as e:
		print("False as create account")
		return False
	finally:
		return True