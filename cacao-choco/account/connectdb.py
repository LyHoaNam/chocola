import mysql.connector
from mysql.connector import Error
def connect():
  try:
      connection = mysql.connector.connect(host='localhost',
                               database='chocola',
                               user='root',
                               password='')
      if connection.is_connected():
         return connection
        
  except Error as e :
      print ("Error while connecting to MySQL", e)
      return False
  return False
#fetch data with single row
def get_one_row (selectStr):
  try:
    connection = connect()
    cursor = connection.cursor()
    cursor.execute(selectStr)
    #fetchone will fecth data with one row
    record = cursor.fetchone()
    return record
  except Error as e :
    print ("Error while get Data" ,e)
    return False
  finally:
     #closing database connection.
     if(connection.is_connected()):
        cursor.close()
        connection.close()
        print("MySQL connection is closed")
#fetch data with all row
def get_all_row(selectStr):
  try:
    connection = connect()
    cursor = connection.cursor()
    cursor.execute(selectStr)
    #fetchall will fetch data with all row
    record = cursor.fetchall()
    return record
  except Error as e :
    print ("Error while get Data" ,e)
    return False
  finally:
     #closing database connection.
     if(connection.is_connected()):
        cursor.close()
        connection.close()
        print("MySQL connection is closed")
def set_data (insertStr):
  try:
    connection = connect()
    cursor = connection.cursor()
    result  = cursor.execute(insertStr)
    connection.commit()
    lastID =cursor.lastrowid
  except Error as e :
    print ("Error while set Data" ,e)
    return False
  finally:
     #closing database connection.
     if(connection.is_connected()):
        cursor.close()
        connection.close()
        return lastID


