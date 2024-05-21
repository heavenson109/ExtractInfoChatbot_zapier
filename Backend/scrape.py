from pathlib import Path
import requests
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright
from zenrows import ZenRowsClient

def remove_unwanted_tags(html_content, unwanted_tags=["script", "style", "header", "footer", "img"]):
    ### Remove script and style ###
    soup = BeautifulSoup(html_content, 'html.parser')

    for tag in unwanted_tags:
        for element in soup.find_all(tag):
            element.decompose()

    bio_divs = soup.find_all('div', class_='bio')

    for div in bio_divs:
        div.decompose()

    return str(soup)

def extract_tags(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    result =[]
    li_tags = soup.find_all('li')
    for li_tag in li_tags:
        li_tag.insert(0, " ")
        text = li_tag.text
        email = li_tag.find('a')['href'].replace('mailto:', '') if li_tag.find('a') else None
        result.append(text)
        result.append(email)

    print(result, "==========result")
    return result

def remove_unnesseray_lines(content):
    # Split content into lines
    lines = content.split("\n")

    # Strip whitespace for each line
    stripped_lines = [line.strip() for line in lines]

    # Filter out empty lines
    non_empty_lines = [line for line in stripped_lines if line]

    # Remove duplicated lines (while preserving order)
    seen = set()
    deduped_lines = [line for line in non_empty_lines if not (
        line in seen or seen.add(line)
    )]

    # Join the cleaned lines without any separators (remove newlines)
    cleaned_content = "".join(deduped_lines)

    return cleaned_content

async def scrape_with_zenrows(url) -> str:
    print("Started scraping...")
    results = ""

    client = ZenRowsClient("2336e42011144321d1aba3e5d5851efd672b1782")
    params = {"js_render":"true"}
    response = client.get(url, params=params)
    page_source = response.text

    remove_unwanted_tags_results = remove_unwanted_tags(page_source)
    results = extract_tags(remove_unwanted_tags_results)
    return results