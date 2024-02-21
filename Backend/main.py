from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException

import pprint

from ai_extractor import extract
from schemas import SchemaNewsWebsites, ecommerce_schema
from scrape import ascrape_playwright

import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

async def scrape_with_playwright(url: str, **kwargs):
    token_limit = 4000

    html_content = await ascrape_playwright(url)

    print(html_content, "=====================html_contenet")

    print("Extracting content with LLM")

    html_content_fits_context_window = html_content[:token_limit]

    extracted_content = extract(**kwargs, content = html_content_fits_context_window)

    pprint.pprint(extracted_content)
    return extracted_content

@app.get("/api/response")
async def get_response(message: str, request: Request):
  try:
    # Read request body

    print("start scraping...")

    ecommerce_url = message
    # car_url = "https://www.westgatehonda.ca/buildandprice/honda.html"

    response = await scrape_with_playwright(
        # url=wsj_url,
        url=ecommerce_url,
        # schema_pydantic=SchemaNewsWebsites,
        schema=ecommerce_schema,
        # schema_pydantic=SchemaCar 
    )
    return response
  
  except Exception as e:
    print(f"Error getting response: {e}")
    raise HTTPException(status_code=500, detail="Error getting response")

if __name__ == "__main__":
  uvicorn.run("app:app", port = 8000, reload=True)
    
