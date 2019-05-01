import mysql.connector
from time import sleep

mydb = mysql.connector.connect(
    host = "localhost",
    user = "pi",
    passwd = "Year3",
    database = "project"
)
mycursor = mydb.cursor()

# Input demo data 1: Cold
sql = "INSERT INTO data(reading_location, humidity, temperature, prediction_max, prediction_min) VALUES('{}', '{:0.1f}%', '{:0.2f}%', '{:0.2f}%', '{:0.2f}%')".format("Demo 1", 0.0, 2.5, 0.0, 0.0)
mycursor.execute(sql) # Execute the query
mydb.commit() # Commit the changes
print("Demo data 1 [Temperature: 2.5*C] added to the database... Sleeping for 5 seconds...")
sleep(5)

# Input demo data 2: Hot
sql = "INSERT INTO data(reading_location, humidity, temperature, prediction_max, prediction_min) VALUES('{}', '{:0.1f}%', '{:0.2f}%', '{:0.2f}%', '{:0.2f}%')".format("Demo 2", 0.0, 25.0, 0.0, 0.0)
mycursor.execute(sql) # Execute the query
mydb.commit() # Commit the changes
print("Demo data 2 [Temperature: 25*C] added to the database... Sleeping for 5 seconds...")
sleep(5)

# Input demo data 3: Neutral
sql = "INSERT INTO data(reading_location, humidity, temperature, prediction_max, prediction_min) VALUES('{}', '{:0.1f}%', '{:0.2f}%', '{:0.2f}%', '{:0.2f}%')".format("Demo 3", 0.0, 15.2, 0.0, 0.0)
mycursor.execute(sql) # Execute the query
mydb.commit() # Commit the changes
print("Demo data 3 [Temperature: 15.2*C] added to the database... Sleeping for 5 seconds...")
sleep(5)

# Done
print("The demo has been completed.")