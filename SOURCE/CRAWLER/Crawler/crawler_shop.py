import urllib.request
import _thread
from bs4 import BeautifulSoup
global global_url
query = input("Query: ")
global_url = "https://www.ebay.de/sch/i.html?_from=R40&_nkw=" + query + "&_sacat=0&LH_TitleDesc=0&LH_Auction=1&LH_Complete=1&LH_Sold=1&rt=nc&LH_PrefLoc=2"

def opensite(url):
    try:
        fp = urllib.request.urlopen(url)
        foundBytes = fp.read()
        html = foundBytes.decode("utf8")
        fp.close()
        searchListings(html)
    except:
        return

links = []
def searchListings(html):
    soup = BeautifulSoup(html, 'html.parser')
    print(soup.prettify())
    mydivs = soup.find_all("div", {"class": "s-item__info"})
    print(mydivs)

opensite(global_url)
print(links)
print(len(links))