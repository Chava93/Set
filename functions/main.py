from flask import escape
import pandas as pd
import numpy as np

def hello_http(request):
    """HTTP Cloud Function.
    Args:
        request (flask.Request): The request object.
        <http://flask.pocoo.org/docs/1.0/api/#flask.Request>
    Returns:
        The response text, or any set of values that can be turned into a
        Response object using `make_response`
        <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>.
    """
    #Los browsers hacen un request con el método OPTIONS.
    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    # Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }

    #En esta variable tenemos acceso al payload
    request_args = request.args

    #Aquí va la lógica de la función
    print('Pandas version: ', pd.__version__)
    print('Numpy version: ', np.version.version)

    #Aquí se envía la respuesta al cliente (como string), junto con un código de status y headers
    example_response = [[0, 6, 9], [1, 2, 7]]
    return (str(example_response), 200, headers)
