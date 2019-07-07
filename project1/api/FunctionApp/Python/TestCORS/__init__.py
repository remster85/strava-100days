import logging
import json
import azure.functions as func
import pathlib

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    with open(pathlib.Path(__file__).parent / 'activities.json') as json_file:
        data = json.load(json_file);
        str = json.dumps(data);
        return func.HttpResponse(str)