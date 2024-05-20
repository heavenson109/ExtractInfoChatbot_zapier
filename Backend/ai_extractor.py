import os

from langchain.chains import (create_extraction_chain, create_extraction_chain_pydantic, LLMChain)
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.prompts import HumanMessagePromptTemplate
from langchain.prompts import SystemMessagePromptTemplate
from langchain.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv()

openai_api_key = os.getenv('openai_api_key')

system_message_prompt = SystemMessagePromptTemplate.from_template(
    "The user provides you the people's data with json format and the people list what the user want to get. Your aim is to find that relevant data and return it with json format."
    "Not output any other explanation sentence. Only return array which element is Json type as a result"
)

human_message_prompt = HumanMessagePromptTemplate.from_template(
    "{question}"
)

llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo-0125", openai_api_key=openai_api_key)

def extract(content: str, **kwargs):
    if 'schema_pydantic' in kwargs:
        response = create_extraction_chain_pydantic(
            pydantic_schema=kwargs["schema_pydantic"], llm = llm
        ).run(content)
        response_as_dict = [item.dict() for item in response]

        return response_as_dict
    
    else:
        return create_extraction_chain(schema=kwargs["schema"], llm=llm).run(content)
    
def getRelevant(content: str):
    llm_chain = LLMChain(prompt=ChatPromptTemplate.from_messages([
          system_message_prompt,
          human_message_prompt,
        ]), llm=llm)
    return llm_chain.run(content)