const config = {
    // Backend config
    region: process.env.REACT_APP_REGION,
    apiGateway: {
        URL: process.env.REACT_APP_API_URL,
    },
    cognito: {
        USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
        APP_CLIENT_ID: process.env.REACT_APP_USER_POOL_CLIENT_ID,
        IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID,
    }
};

export default config;
