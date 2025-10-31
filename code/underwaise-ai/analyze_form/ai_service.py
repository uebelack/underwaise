from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel

load_dotenv()

from llm import get_gpt_mini_llm


class Joke(BaseModel):
    joke: str


app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/joke")
def get_joke() -> Joke:
    """
    Get a joke from the LLM.
    """
    joke = get_gpt_mini_llm().invoke(
        "Tell me a joke, just return the joke, no other text"
    )
    return Joke(joke=joke.content)
