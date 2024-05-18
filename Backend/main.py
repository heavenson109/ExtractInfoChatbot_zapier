from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException

import pprint
import json
import re

from ai_extractor import extract, getRelevant
from scrape import scrape_with_zenrows

import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

app.extractedContents=[]

def makeSchema(input):
    list = input.split(",")
    properties = {element: {"type": "string"} for element in list}
    schema = {"properties": properties}
    return schema

async def scrape_with_playwright(url: str, **kwargs):
    token_limit = 16000

    html_content = await scrape_with_zenrows(url)

    print("Extracting content with LLM")

    wholeContent = ','.join(str(x) for x in html_content)
    html_content_fits_context_window = wholeContent[:token_limit]
    
    extracted_content = extract(**kwargs, content = html_content_fits_context_window)

    pprint.pprint(extracted_content)
    return extracted_content

@app.post("/api/extract")
async def get_response(request: Request):
  try:
    data = await request.json()

    scrapedUrl = data['url'],
    prompt = data['infoCol']

    print("start scraping...")

    response = await scrape_with_playwright(
        scrapedUrl,
        schema=makeSchema(prompt)
    )

    app.extractedContents=response
    return response
  
  except Exception as e:
    print(f"Error getting response: {e}")
    raise HTTPException(status_code=500, detail="Error getting response")
  
@app.post("/api/relevant")
async def get_response(request: Request):
  try:
    data = await request.json()
    target = data['target']

    target_list = re.split(r",\s*", target)
    filtered_data = [d for d in app.extractedContents if "role" in d and any(target.lower() in d["role"].lower() for target in target_list)]
    response = json.dumps(filtered_data, indent=2)
    return response
    
  except Exception as e:
    print(f"Error getting response: {e}")
    raise HTTPException(status_code=500, detail="Error getting response")

if __name__ == "__main__":
  uvicorn.run("app:app", port = 8000, reload=True)
    
