import board
import busio
import digitalio
import adafruit_bmp280

spi = busio.SPI(board.SCK, MOSI=board.MOSI, MISO=board.MISO)
cs = digitalio.DigitalInOut(board.D5)
sensor = adafruit_bmp208.Adafruit_BMP280_SPI(spi, cs)

