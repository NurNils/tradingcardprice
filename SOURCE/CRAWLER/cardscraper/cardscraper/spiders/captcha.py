import time
import random
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import pydub
import urllib
import speech_recognition

data_path = "/home/ubuntu/Documents/Code/Angular/Scrapy/cardscraper/cardscraper/spiders/captcha.py"

browser = webdriver.Chrome("chromedriver")
browser.get("https://www.ebay.de/splashui/captcha?")
time.sleep(random.randint(2,4))
frame = browser.find_element_by_tag_name("iframe")
browser.switch_to.frame(frame)
time.sleep(random.randint(1,2))
browser.find_element_by_class_name("recaptcha-checkbox-border").click()

browser.switch_to.default_content()
frames = browser.find_elements_by_tag_name("iframe")
browser.switch_to.frame(frames[2])
time.sleep(random.randint(4,6))
browser.find_element_by_id("recaptcha-audio-button").click()
#Bis hier hin funktioniert aber Beay mal wieder Huso

browser.switch_to.default_content()
frame = browser.find_element_by_tag_name("iframe")
browser.switch_to.frame(frame[-1])
time.sleep(random.randint(2,4))
browser.find_element_by_xpath("/html/body/div/div/div[3]/div/button").click()
src = browser.find_elements_by_id("audio-source").get_attribute("src")
urllib.request.urlretrieve(src, data_path + "\\audio.mp3")
sound = pydub.AudioSegment.from_mp3(data_path + "\\audio.mp3").export(data_path + "\\audio.wav", format="wav")

recognizer = speech_recognition.Recognizer()
google_audio = speech_recognition.AudioFile(data_path + "\\audio.wav")
with google_audio as source:
        audio = recognizer.record(source)
text = recognizer.recognize_google(audio, language='de-DE')
#Kontrollausgabe
print("<Erkannter Text>: {}".format(text))

inputfield = browser.find_element_by_id("audio-response")
inputfield.send_keys(text.lower())
inputfield.send_keys(Keys.ENTER)
