import os
import json
from datetime import datetime
import logging
import boto3


def _create_s3_key(datetime_obj, time_range):
    return (
        f"spotify/artists/{time_range}/{datetime_obj.strftime('%Y')}/{datetime_obj.strftime('%m')}/"
        f"top_artists_{time_range}_{datetime_obj.strftime('%Y%m%d')}.json"
    )


def _process_s3_data(s3_obj):
    return [
        {
            "id": int(key),
            "artist": val,
        }
        for key, val in s3_obj.items()
    ]


class GetArtistsData:
    def __init__(self):
        self.s3 = boto3.client("s3")
        self.bucket_name = os.getenv("STAGING_BUCKET_NAME")
        self.logger = logging.getLogger(self.__class__.__name__)

    def get_latest_s3_key(self, time_range):
        prefix = f"spotify/artists/{time_range}/"
        self.logger.info(f"Listing objects with {prefix=} in {self.bucket_name}...")
        bucket_objects = self.s3.list_objects_v2(
            Bucket=self.tracks_data_bucket_name, Prefix=prefix
        )
        return max(bucket_objects["Contents"], key=lambda x: x["LastModified"])["Key"]

    def _get_latest_key_date(self, time_range):
        latest_s3_key = self.get_latest_s3_key(time_range)
        filename = latest_s3_key.split("/")[-1]
        datestring = (filename.split(".")[0]).split("_")[-1]
        datetime_obj = datetime.strptime(datestring, "%Y%m%d")
        return datetime_obj

    def _get_s3_key_datetime(self, date_string, time_range):
        if not date_string:
            date_obj = self._get_latest_key_date(time_range)
        else:
            date_obj = datetime.strptime(date_string, "%d-%m-%Y")
        return date_obj

    def _get_s3_data(self, key):
        self.logger.info(f"Retrieving S3 data for {key}...")
        s3_obj = self.s3.get_object(Key=key, Bucket=self.bucket_name)
        return json.loads(s3_obj["Body"].read())

    def get_artists_data(self, event):
        time_range = event.get("pathParameters", {}).get("time_range")
        date_string = event.get("pathParameters", {}).get("date")
        self.logger.info(f"Received inputs {date_string=} and {time_range=}")
        key_date_obj = self._get_s3_key_datetime(date_string, time_range)
        s3_key = _create_s3_key(key_date_obj, time_range)
        s3_obj = self._get_s3_data(s3_key)
        processed_data = _process_s3_data(s3_obj)
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
