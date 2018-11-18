import Adafruit_DHT # Library for DHT sensor
import mysql.connector # Library for mysql connections
from time import sleep # Library which allows us to "sleep", or delay the execution of the next iteration

dht_sensor = Adafruit_DHT.DHT22 # Specify which sensor we are using
DHT_PIN = 2 # Specify the GPIO number where the sensor is connected
DELAY_INTERVAL = 2 # Specify the wait time between iterations

# Initialise the database connection
mydb = mysql.connector.connect(
    host = "localhost",
    user = "pi",
    passwd = "Year3",
    database = "project"
)

# Have a variably that holds our database link
mycursor = mydb.cursor()

print("Database connection successful...") # Inform the user
location = input("Input the location of the weather station: "); # Prompt the user for the location of the station

sql = "INSERT INTO location(loc) VALUES('"+location+"')" # Create the query to store the location
mycursor.execute(sql) # Execute the query
mydb.commit() # Commit the changes

# Infinite loop, with 2 seconds in between each iteration (the sensor can only read data once every 2 seconds)
while True:
    humidity, temperature = Adafruit_DHT.read_retry(dht_sensor, DHT_PIN) # Read in the humidity and temperature from the sensor
    
    sql = "INSERT INTO humidity(reading) VALUES('{:0.1f}%')".format(humidity) # Create the insertion query
    mycursor.execute(sql) # Execute the query
    mydb.commit() # Commit the changes
    
    sql = "INSERT INTO temperature(reading) VALUES('{:0.2f}%')".format(temperature) # Create the insertion query
    mycursor.execute(sql) # Execute the query
    mydb.commit() # Commit the changes

    print("Database write complete.") # Output the status to the console
    sleep(DELAY_INTERVAL) # wait the specified amount of time