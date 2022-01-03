import * as sst from "@serverless-stack/resources";
import * as iam from "@aws-cdk/aws-iam";

export default class ApiStack extends sst.Stack {
    // Public references:
    api;

    constructor(scope, id, props) {
        super(scope, id, props);

        const { bucket } = props;

        // API resources: (cors enabled by default)
        this.api = new sst.Api(this, "Api", {
            defaultAuthorizationType: "AWS_IAM",
            defaultFunctionProps: {
                srcPath: "src",
                environment: {
                    STAGING_BUCKET_NAME: bucket.bucketName,  // process.env.STAGING_BUCKET_NAME,
                },
            },
            routes: {
                "GET /tracks": "get_tracks.main",
            }
        });
        this.api.attachPermissions([bucket
            // new iam.PolicyStatement({
            //     actions: ["s3:*"],
            //     effect: iam.Effect.ALLOW,
            //     resources: ["arn:aws:s3:::datalakestack-stagingdataec9fbd02-ejw4ydpkx3ap/*"],
            // }),
        ]);

        // Outputs:
        this.addOutputs({
            ApiEndpoint: this.api.url,
        });
    }
}
