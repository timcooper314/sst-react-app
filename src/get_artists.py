import os
import json
from datetime import datetime
import boto3


def _create_s3_key(datetime_obj):
    return f"spotify/artists/{datetime_obj.strftime('%Y')}/{datetime_obj.strftime('%m')}/top_artists_{datetime_obj.strftime('%Y%m%d')}.json"


class GetArtistsData:
    def __init__(self):
        self.s3 = boto3.client("s3")
        self.bucket_name = os.getenv("STAGING_BUCKET_NAME")

    def get_latest_s3_key(self):
        bucket_objects = self.s3.list_objects_v2(
            Bucket=self.bucket_name, Prefix="spotify/artists/"
        )
        return max(bucket_objects["Contents"], key=lambda x: x["LastModified"])["Key"]

    def _get_latest_key_date(self):
        latest_s3_key = self.get_latest_s3_key()
        filename = latest_s3_key.split("/")[-1]
        datestring = (filename.split(".")[0]).split("_")[-1]
        datetime_obj = datetime.strptime(datestring, "%Y%m%d")
        return datetime_obj

    def _get_s3_key_datetime(self, event):
        date_string = event.get("pathParameters", {}).get("date")
        if not date_string:
            date_obj = self._get_latest_key_date()
        else:
            date_obj = datetime.strptime(date_string, "%d-%m-%Y")
        return date_obj

    def get_s3_data(self, key):
        s3_obj = self.s3.get_object(Key=key, Bucket=self.bucket_name)
        return json.loads(s3_obj["Body"].read())

    def process_s3_data(self, s3_obj):
        return [
            {
                "id": int(key),
                "artist": val,
            }
            for key, val in s3_obj.items()
        ]

    def get_artists_data(self, event):
        key_date_obj = self._get_s3_key_datetime(event)
        s3_key = _create_s3_key(key_date_obj)
        s3_obj = self.get_s3_data(s3_key)
        processed_data = self.process_s3_data(s3_obj)
        return processed_data


def main(event, context):
    artists_data = GetArtistsData().get_artists_data(event)
    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Headers": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,GET",
        },
        "body": json.dumps(artists_data),
    }
