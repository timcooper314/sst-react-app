import * as sst from "@serverless-stack/resources";
import * as iam from "@aws-cdk/aws-iam";

export default class InfrastructureStack extends sst.Stack {
    // Public references:
    api;

    constructor(scope, id, props) {
        super(scope, id, props);

        // API resources: (cors enabled by default)
        this.api = new sst.Api(this, "Api", {
            defaultFunctionProps: {
                srcPath: "src",
                environment: {
                    STAGING_BUCKET_NAME: "stagings"
                },
            },
            routes: {
                "GET /tracks": "get_tracks.main",
            }
        });
        this.api.attachPermissions([
            new iam.PolicyStatement({
                actions: ["s3:*"],
                effect: iam.Effect.ALLOW,
                resources: ["arn:aws:s3:::datalakestack-stagingdataec9fbd02-ejw4ydpkx3ap/*"],
            }),
        ]);

        // Outputs:
        this.addOutputs({
            ApiEndpoint: this.api.url,
        });
    }
}
