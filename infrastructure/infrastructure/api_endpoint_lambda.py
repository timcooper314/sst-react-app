import json
from datetime import datetime
import boto3


class GetTracksData:
    def __init__(self):
        self.s3 = boto3.client("s3")
        self.tracks_data_bucket_name = (
            "datalakestack-stagingdataec9fbd02-ejw4ydpkx3ap"  # os.getenv()
        )

    def get_s3_key(self):
        datetime_now = datetime.now().strftime("%Y%m%d")
        month_now = datetime.now().strftime("%m")
        return f"spotify/{month_now}/top_tracks{datetime_now}.json"

    def get_s3_data(self, key):
        s3_obj = self.s3.get_object(Key=key, Bucket=self.tracks_data_bucket_name)
        return json.loads(s3_obj["Body"].read())

    def process_s3_data(self, s3_obj):
        return [
            {
                "id": int(key),
                "artist": val[list(val.keys())[0]],
                "track": list(val.keys())[0],
            }
            for key, val in s3_obj.items()
        ]

    def get_tracks_data(self):
        s3_key = self.get_s3_key()
        s3_obj = self.get_s3_data(s3_key)
        processed_data = self.process_s3_data(s3_obj)
        return processed_data


def lambda_handler(event, context):
    tracks_data = GetTracksData().get_tracks_data()
    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Headers": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,GET",
        },
        "body": json.dumps(
            tracks_data
            # [
            #     {"id": 1, "artist": "artist_x", "track": "track_x"},
            #     {"id": 2, "artist": "artist_y", "track": "track_y"},
            # ]
        ),
    }
