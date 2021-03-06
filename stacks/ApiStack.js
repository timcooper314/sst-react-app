import * as sst from "@serverless-stack/resources";
import * as iam from "@aws-cdk/aws-iam";
import * as cdk from "@aws-cdk/core";

export default class ApiStack extends sst.Stack {
    // Public references:
    api;

    constructor(scope, id, props) {
        super(scope, id, props);

        const stagingBucketName = cdk.Fn.importValue("dev-api-ingestion-raw-bucket-name");
        const stagingBucketArn = cdk.Fn.importValue("dev-api-ingestion-raw-bucket-arn");

        // API resources: (cors enabled by default)
        this.api = new sst.Api(this, "Api", {
            defaultAuthorizationType: "AWS_IAM",
            defaultFunctionProps: {
                srcPath: "src",
                environment: {
                    STAGING_BUCKET_NAME: stagingBucketName.toString(),
                },
            },
            routes: {
                "GET /topmusic/tracks/{time_range}/{date}": "get_tracks.main",
                "GET /topmusic/artists/{time_range}/{date}": "get_artists.main",
                "GET /topmusic/dates/{type}/{time_range}": "get_dates.main",
            }
        });
        this.api.attachPermissions([
            new iam.PolicyStatement({
                actions: ["s3:Get*", "s3:List*"],
                effect: iam.Effect.ALLOW,
                resources: [stagingBucketArn.toString(),
                stagingBucketArn.toString() + "/*"],
            }),
        ]);

        // Outputs:
        this.addOutputs({
            ApiEndpoint: this.api.url,
        });
    }
}
