from fastapi import FastAPI

try:
    from services import model_person_details, search_schemes
except ImportError:
    from backend.services import model_person_details, search_schemes

app = FastAPI()


@app.post("/model-person-details")
def model_person_details_endpoint():
    pass


@app.post("/search-schemes")
def search_schemes_endpoint():
    pass
