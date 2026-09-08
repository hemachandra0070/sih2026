try:
    from services import model_person_details as service_model_person_details
    from services import search_schemes as service_search_schemes
except ImportError:
    from backend.services import model_person_details as service_model_person_details
    from backend.services import search_schemes as service_search_schemes

from mcp.server.fastmcp import FastMCP

mcp = FastMCP("sih-backend")


@mcp.tool()
def model_person_details(person_details):
    return service_model_person_details(person_details)


@mcp.tool()
def search_schemes(person_details_model):
    return service_search_schemes(person_details_model)


if __name__ == "__main__":
    mcp.run()
