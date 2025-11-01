import os
from langchain_openai import AzureOpenAIEmbeddings, AzureChatOpenAI

API_VERSION = "2025-04-01-preview"


def get_gpt_mini_llm():
    return AzureChatOpenAI(
        openai_api_version=API_VERSION,
        model="gpt-mini",
        azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
        api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    )


def get_gpt_chat_llm():
    return AzureChatOpenAI(
        openai_api_version=API_VERSION,
        model="gpt-chat",
        azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
        api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    )
