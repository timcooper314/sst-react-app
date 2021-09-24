from aws_cdk import core as cdk
from aws_cdk import aws_s3 as s3
from aws_cdk import aws_lambda as lambda_
from aws_cdk import aws_s3_deployment as s3_deployment
from aws_cdk import aws_apigateway as apigateway
# import boto3


class InfrastructureStack(cdk.Stack):
    def __init__(self, scope: cdk.Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        crispy_umbrella_bucket = s3.Bucket(self, "crispy-umbrella",
                                                public_read_access=True,  # Might need to be more secure...
                                                website_index_document="index.html")

        # s3_deployment.BucketDeployment(self, "deployStaticWebsite",
        #                                sources=[s3_deployment.Source.asset("../build")],
        #                                destination_bucket=crispy_umbrella_bucket)

        # API Gateway and Lambda:
        api_endpoint_lambda = lambda_.Function(self, "api-endpoint-lambda",
                                               runtime=lambda_.Runtime.PYTHON_3_8,
                                               handler="api_endpoint_lambda.lambda_handler",
                                               code=lambda_.Code.from_asset("./infrastructure/"))

        api = apigateway.RestApi(self, "hello-world-api",
                                 rest_api_name="Hello World",
                                 endpoint_export_name="helloworldurl")

        get_api_integration = apigateway.LambdaIntegration(api_endpoint_lambda,
                                                           request_templates={"application/json": '{"statusCode": "200"}'})
        api.root.add_method("GET", get_api_integration)

        # Connect function to API gateway
        hello = api.root.add_resource("{id}")
        get_hello_integration = apigateway.LambdaIntegration(api_endpoint_lambda)

        hello.add_method("GET", get_hello_integration)

        # Output parameters:
        cdk.CfnOutput(self, "crispy_umbrella_bucket",
                      value=crispy_umbrella_bucket.bucket_name)

        cdk.CfnOutput(self, "helloworldurl",
                      value=api.url)
