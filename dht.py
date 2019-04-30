import Adafruit_DHT # Library for DHT sensor
import mysql.connector # Library for mysql connections
from time import sleep # Library which allows us to "sleep", or delay the execution of the next iteration

dht_sensor = Adafruit_DHT.DHT22 # Specify which sensor we are using
DHT_PIN = 2 # Specify the GPIO number where the sensor is connected
DELAY_INTERVAL = 3 # Specify the wait time between iterations

# Initialise the database connection
mydb = mysql.connector.connect(
    host = "localhost",
    user = "pi",
    passwd = "Year3",
    database = "project"
)

# Have a variably that holds our database link for insertion
mycursor = mydb.cursor()

print("Database connection successful...") # Inform the user
location = raw_input("Input the location of the weather station: "); # Prompt the user for the location of the station

# Infinite loop, with 2 seconds in between each iteration (the sensor can only read data once every 2 seconds)
while True:
    humidity, temperature = Adafruit_DHT.read_retry(dht_sensor, DHT_PIN) # Read in the humidity and temperature from the sensor
    
    sql = "INSERT INTO data(reading_location, humidity, temperature) VALUES('{}', '{:0.1f}%', '{:0.2f}%')".format(location, humidity, temperature)
    mycursor.execute(sql) # Execute the query
    mydb.commit() # Commit the changes

    print("Reading @ {} => Humidity: {:0.1f}% , Temperature: {:0.2f}*C".format(location, humidity, temperature)) # Output the status to the console
    sleep(DELAY_INTERVAL) # wait the specified amount of time before taking another reading (the sensor takes about 3 seconds to update)