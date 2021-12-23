import scrapy


class LMFSpider(scrapy.Spider):
    name = 'card'
    start_urls =  ['https://www.ebay.es/sch/i.html?_from=R40&_nkw=base+set+glurak+4%2F102&_sacat=0&LH_Complete=1']
    
    def parse(self, response): 
        for products in response.css('li.s-item'):
            yield {
                'name': products.css('h3.s-item__title::text').get(),
                'link': products.css('a.s-item__link').attrib['href'],
                'bids': int(products.css('span.s-item__bids::text').get().replace(' Gebote', '')),
                'price': int(products.css('span.s-item__price').get().replace('<span class="s-item__price"><span class="POSITIVE">EUR ', '').replace('</span>', '')),
                #'date': products.css('div.s-item__title--tagblock::text').get().replace('Verkauft ', '')
            }
