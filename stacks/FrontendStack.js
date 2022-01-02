import * as sst from "@serverless-stack/resources";

export default class FrontendStack extends sst.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);

        const { api } = props;

        const react_site = new sst.ReactStaticSite(this, "ReactSite", {
            path: "frontend",
            environment: {
                REACT_APP_API_URL: api.url,
                REACT_APP_REGION: scope.region,
            },
        });

        this.addOutputs({
            SiteUrl: react_site.url,
        });
    }
}
