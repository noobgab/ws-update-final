import Adafruit_DHT
import mysql.connector
from time import sleep

dht_sensor = Adafruit_DHT.DHT22
DHT_PIN = 2
DELAY_INTERVAL = 2

mydb = mysql.connector.connect(
    host = "localhost",
    user = "pi",
    passwd = "Year3",
    database = "project"
)

mycursor = mydb.cursor()

print("Database connection successful...")
location = input("Input the location of the weather station: ");

while True:
    humidity, temperature = Adafruit_DHT.read_retry(dht_sensor, DHT_PIN)
    
    sql = "INSERT INTO humidity(reading) VALUES('{:0.1f}%')".format(humidity)
    mycursor.execute(sql)
    mydb.commit()
    
    sql = "INSERT INTO temperature(reading) VALUES('{:0.2f}%')".format(temperature)
    mycursor.execute(sql)
    mydb.commit()

    print("Database write complete.")
    sleep(DELAY_INTERVAL)