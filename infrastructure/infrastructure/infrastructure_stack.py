from aws_cdk import core as cdk
from aws_cdk import aws_s3 as s3
from aws_cdk import aws_lambda as lambda_
from aws_cdk import aws_s3_deployment as s3_deployment
from aws_cdk import aws_apigateway as apigateway
from aws_cdk import aws_iam as iam


class InfrastructureStack(cdk.Stack):
    def __init__(self, scope: cdk.Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        crispy_umbrella_bucket = s3.Bucket(
            self,
            "crispy-umbrella",
            public_read_access=True,  # Might need to be more secure...
            website_index_document="index.html",
        )

        # s3_deployment.BucketDeployment(self, "deployStaticWebsite",
        #                                sources=[s3_deployment.Source.asset("../build")],
        #                                destination_bucket=crispy_umbrella_bucket)

        # API Gateway and Lambda:
        lambda_role = iam.Role(
            self,
            "ApiLambdaRole",
            assumed_by=iam.ServicePrincipal("lambda.amazonaws.com"),
        )
        # TODO: staging data bucket as env var?
        staging_data_bucket_arn = cdk.Fn.import_value("stagingdatabucketarn")
        lambda_role.add_to_policy(
            iam.PolicyStatement(
                effect=iam.Effect.ALLOW,
                resources=[f"{staging_data_bucket_arn}/*"],
                actions=["s3:Get*", "s3:List*"],
            )
        )

        api_endpoint_lambda = lambda_.Function(
            self,
            "api-endpoint-lambda",
            runtime=lambda_.Runtime.PYTHON_3_8,
            handler="api_endpoint_lambda.lambda_handler",
            code=lambda_.Code.from_asset("./infrastructure/"),
            role=lambda_role,
        )
        # TODO: grant s3 read access to lambda
        api = apigateway.RestApi(
            self,
            "tracks-data-api",
            rest_api_name="Tracks Data",
            endpoint_export_name="tracksdataurl",
            default_cors_preflight_options={
                "allow_origins": apigateway.Cors.ALL_ORIGINS,
                "allow_methods": ["GET", "OPTIONS"],
            },
        )

        get_api_integration = apigateway.LambdaIntegration(
            api_endpoint_lambda,
            request_templates={"application/json": '{"statusCode": "200"}'},
        )
        api.root.add_method("GET", get_api_integration)

        # Connect function to API gateway
        # hello = api.root.add_resource("{id}")
        # get_hello_integration = apigateway.LambdaIntegration(api_endpoint_lambda)
        # hello.add_method("GET", get_hello_integration)

        # Output parameters:
        cdk.CfnOutput(
            self,
            "crispy_umbrella_bucket",
            value=crispy_umbrella_bucket.bucket_name,
        )
        cdk.CfnOutput(self, "tracksdataurl", value=api.url)
