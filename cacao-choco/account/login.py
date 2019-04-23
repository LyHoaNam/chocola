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
def create_account(username,password):
	sql_str="""INSERT INTO `users`(`username`, `pass`) 
	VALUES ('{}','{}');""".format(username,password)
	try:
		db.set_data(sql_str)
	except Erros as e:
		print("False as create account")
		return False
	finally:
		print(sql_str)
		return True