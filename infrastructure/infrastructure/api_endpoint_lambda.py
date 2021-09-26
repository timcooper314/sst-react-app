import json


def lambda_handler(event, context):
    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Headers": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,GET",
        },
        "body": json.dumps(
            [
                {"id": 1, "artist": "artist_x", "track": "track_x"},
                {"id": 2, "artist": "artist_y", "track": "track_y"},
            ]
        ),
    }
