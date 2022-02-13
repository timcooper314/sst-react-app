import os
import json
from datetime import datetime
import boto3


class GetDatesData:
    def __init__(self):
        self.s3 = boto3.client("s3")
        self.raw_data_bucket_name = os.getenv("STAGING_BUCKET_NAME")

    def get_s3_objects_list(self, endpoint, time_range):
        bucket_objects = self.s3.list_objects_v2(
            Bucket=self.raw_data_bucket_name, Prefix=f"spotify/{endpoint}/{time_range}/"
        )
        return bucket_objects["Contents"]

    def get_dates_data(self, event):
        endpoint_type = event.get("pathParameters", {}).get("type")  # tracks or artists
        time_range = event.get("pathParameters", {}).get("time_range")
        s3_objects = self.get_s3_objects_list(endpoint_type, time_range)
        s3_dates_list = []
        for obj in s3_objects:
            s3_key = obj["Key"]
            if s3_key.endswith("/"):
                continue
            filename = s3_key.split("/")[-1]
            datestring = (filename.split(".")[0]).split("_")[-1]
            datetime_obj = datetime.strptime(datestring, "%Y%m%d")
            new_dt_string = datetime_obj.strftime("%d-%m-%Y")
            s3_dates_list.append(new_dt_string)
        s3_dates_list.reverse()
        return s3_dates_list


def main(event, context):
    dates_data = GetDatesData().get_dates_data(event)
    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Headers": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,GET",
        },
        "body": json.dumps(dates_data),
    }
