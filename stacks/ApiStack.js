import * as sst from "@serverless-stack/resources";
import * as iam from "@aws-cdk/aws-iam";

export default class ApiStack extends sst.Stack {
    // Public references:
    api;

    constructor(scope, id, props) {
        super(scope, id, props);

        // API resources: (cors enabled by default)
        this.api = new sst.Api(this, "Api", {
            defaultAuthorizationType: "AWS_IAM",
            defaultFunctionProps: {
                srcPath: "src",
                environment: {
                    STAGING_BUCKET_NAME: process.env.STAGING_BUCKET_NAME,
                },
            },
            routes: {
                "GET /topmusic/tracks": "get_tracks.main",
                "GET /topmusic/artists": "get_artists.main",
            }
        });
        this.api.attachPermissions([
            new iam.PolicyStatement({
                actions: ["s3:Get*", "s3:List*"],
                effect: iam.Effect.ALLOW,
                resources: [process.env.STAGING_BUCKET_ARN,
                process.env.STAGING_BUCKET_ARN + "/*"],
            }),
        ]);

        // Outputs:
        this.addOutputs({
            ApiEndpoint: this.api.url,
        });
    }
}
