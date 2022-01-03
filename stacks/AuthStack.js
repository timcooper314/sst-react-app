import * as sst from "@serverless-stack/resources";
import * as iam from "@aws-cdk/aws-iam";

export default class AuthStack extends sst.Stack {
    // Public references:
    auth;

    constructor(scope, id, props) {
        super(scope, id, props);

        const { api, bucket } = props;

        // Create a Cognito User pool and Identity Pool:
        this.auth = new sst.Auth(this, "auth", {
            "cognito": {
                "userPool": {
                    "signInAliases": { "email": true },
                },
            },
        });

        // Grant access for authenticated users to the api and s3 bucket
        this.auth.attachPermissionsForAuthUsers([
            api,
            new iam.PolicyStatement({
                actions: ["s3:List*", "s3:Get*"],
                effect: iam.Effect.ALLOW,
                resources: [
                    bucket.bucketArn + "/*",
                    bucket.bucketArn + "/private/${cognito-identity.amazonaws.com:sub}/*",
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
