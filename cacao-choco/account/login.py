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
		values["password"]=result[2]
		values["iddata"]=result[3]
		return values
	return False