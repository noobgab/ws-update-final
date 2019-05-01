import Adafruit_DHT # Library for DHT sensor
import mysql.connector # Library for mysql connections
from time import sleep # Library which allows us to "sleep", or delay the execution of the next iteration

from sklearn import linear_model
import pandas as pd

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
location = "WeatherStation"
#location = raw_input("Input the location of the weather station: "); # Prompt the user for the location of the station

print("The location location of the weather station has been set to: {}".format(location))

training = pd.read_csv('sample_training.csv')
training.columns = ["1"]

labels_max = pd.read_csv('label_max.csv')
labels_max.columns = ["1"]

labels_min = pd.read_csv('label_min.csv')
labels_min.columns = ["1"]

regr_max = linear_model.LinearRegression()
regr_max.fit(training, labels_max.values.ravel())

regr_min = linear_model.LinearRegression()
regr_min.fit(training, labels_min.values.ravel())

def predict_max(num):
    data = pd.DataFrame(data=[num], index=[0], columns=[0])
    result = regr_max.predict(data)
    return result[0]

def predict_min(num):
    data = pd.DataFrame(data=[num], index=[0], columns=[0])
    result = regr_min.predict(data)
    return result[0]

# Infinite loop, with 2 seconds in between each iteration (the sensor can only read data once every 2 seconds)
while True:
    humidity, temperature = Adafruit_DHT.read_retry(dht_sensor, DHT_PIN) # Read in the humidity and temperature from the sensor
    
    sql = "INSERT INTO data(reading_location, humidity, temperature, prediction_max, prediction_min) VALUES('{}', '{:0.1f}%', '{:0.2f}%', '{:0.2f}%', '{:0.2f}%')".format(location, humidity, temperature, predict_max(temperature), predict_min(temperature))
    mycursor.execute(sql) # Execute the query
    mydb.commit() # Commit the changes

    print("Reading @ {} => Humidity: {:0.1f}% , Temperature: {:0.2f}*C".format(location, humidity, temperature)) # Output the status to the console
    print("Prediction: Max: {}*C , Min: {}*C\n".format(predict_max(temperature), predict_min(temperature)))
    sleep(DELAY_INTERVAL) # wait the specified amount of time before taking another reading (the sensor takes about 3 seconds to update)