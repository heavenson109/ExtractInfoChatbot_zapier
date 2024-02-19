import asyncio
import pprint

from ai_extractor import extract
from schemas import SchemaNewsWebsites, ecommerce_schema, SchemaCar
from scrape import ascrape_playwright

if __name__ ==  "__main__":
    print("start scraping...")

    token_limit = 4000

    ecommerce_url = "https://appsumo.com"
    # ecommerce_url = "https://www.bloomnation.com/shop/los-angeles-ca/flower-delivery"
    # wsj_url = "https://www.wsj.com"
    car_url = "https://www.westgatehonda.ca/buildandprice/honda.html"

    async def scrape_with_playwright(url: str, **kwargs):
        html_content = await ascrape_playwright(url)

        print("Extracting content with LLM")

        html_content_fits_context_window = html_content[:token_limit]

        extracted_content = extract(**kwargs, content = html_content_fits_context_window)

        pprint.pprint(extracted_content)

    # Scrape and Extract with LLM
    asyncio.run(scrape_with_playwright(
        # url=wsj_url,
        # url=ecommerce_url,
        # schema_pydantic=SchemaNewsWebsites,
        # schema=ecommerce_schema,
        url=car_url,
        schema_pydantic=SchemaCar 
    ))
    
