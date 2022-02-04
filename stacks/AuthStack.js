import * as sst from "@serverless-stack/resources";
import * as iam from "@aws-cdk/aws-iam";
import * as cdk from "@aws-cdk/core";

export default class AuthStack extends sst.Stack {
    // Public references:
    auth;

    constructor(scope, id, props) {
        super(scope, id, props);

        const { api } = props;

        // Create a Cognito User pool and Identity Pool:
        this.auth = new sst.Auth(this, "auth", {
            "cognito": {
                "userPool": {
                    "signInAliases": { "email": true },
                },
            },
        });
        const stagingBucketArn = cdk.Fn.importValue("dev-api-ingestion-raw-bucket-arn");

        // Grant access for authenticated users to the api and s3 bucket
        this.auth.attachPermissionsForAuthUsers([
            api,
            new iam.PolicyStatement({
                actions: ["s3:List*", "s3:Get*"],
                effect: iam.Effect.ALLOW,
                resources: [
                    stagingBucketArn.toString() + "/*",
                    // bucket.bucketArn + "/*",
                    // bucket.bucketArn + "/private/${cognito-identity.amazonaws.com:sub}/*",
                ],
            })
        ]);

        this.addOutputs({
            Region: scope.region,
            UserPoolId: this.auth.cognitoUserPool.userPoolId,
            IdentityPoolId: this.auth.cognitoCfnIdentityPool.ref,
            UserPoolClientId: this.auth.cognitoUserPoolClient.userPoolClientId,
        });
    }
}
