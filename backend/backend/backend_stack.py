from aws_cdk import core as cdk
from aws_cdk import aws_s3 as s3


class BackendStack(cdk.Stack):
    def __init__(self, scope: cdk.Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        crispy_umbrella_bucket = s3.Bucket(self, "crispy-umbrella")
