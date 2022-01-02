import * as sst from "@serverless-stack/resources";

export default class StorageStack extends sst.Stack {
    // Public references:
    bucket;

    constructor(scope, id, props) {
        super(scope, id, props);

        // Create an S3 bucket
        this.bucket = new sst.Bucket(this, "Uploads", {
            s3Bucket: {
                // Allow client side access to the bucket from a different domain
                cors: [
                    {
                        maxAge: 3000,
                        allowedOrigins: ["*"],
                        allowedHeaders: ["*"],
                        allowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
                    },
                ],
            },
        });
    }
}