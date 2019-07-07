import logging
import json
import azure.functions as func
import pathlib
from azure.storage.blob import BlockBlobService

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    block_blob_service = BlockBlobService(account_name='remsstravaactivities', account_key='FLZLc8w/ixYcfulAU8rMGRsYoYk7hK5TG3PHHbypAsPhLpASiEwYqcrTLu80xBihCYRZCNhzxA1tUlppOyOu1g==')
    block_blob_service.get_blob_to_path('activities', 'remi', 'remi.json')

    with open(pathlib.Path(__file__).parent / 'remi.json') as json_file:
        str = json_file.read().replace('ï»¿','',1)
        headers  = {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "Get, Post, Options"
        }
        return func.HttpResponse(str, headers=headers)

        