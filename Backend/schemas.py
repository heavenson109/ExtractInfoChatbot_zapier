from typing import List, Optional

from pydantic import BaseModel, Field

ecommerce_schema = {
    "properties": {
        # "item_title": {"type": "string"},
        # "item_price": {"type": "number"},
        # "item_extra_info": {"type": "string"}
        "item_firstName": {"type": "string"},
        "item_LastName": {"type": "string"},
        "item_phoneNumber": {"type": "string"},
        
    },
    "required": ["item_name", "price", "item_extra_info"]
}

class SchemaNewsWebsites(BaseModel):
    news_article_title: str
    news_article_summary: str
    news_article_extra_info: str

# class SchemaCar(BaseModel):
#     EngineType: str
#     City: str
#     Highway: str
#     price: str