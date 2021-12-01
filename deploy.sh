#!/bin/bash

export AWS_PROFILE=
export CDK_DEFAULT_ACCOUNT=
export CDK_DEFAULT_REGION=ap-southeast-2

echo "***Installing dependencies...***"
cd infrastructure
pip install -r requirements.txt

echo "***Deploying aws infrastructure...***"
cdk synth
cdk deploy

stack_name="InfrastructureStack"
crispyUmbrellaBucketName=$(aws --output text cloudformation describe-stacks --stack-name $stack_name --query "Stacks[].Outputs[?OutputKey=='crispyumbrellabucket'].OutputValue[]")
tracksDataEndpointUrl=$(aws --output text cloudformation describe-stacks --stack-name $stack_name --query "Stacks[].Outputs[?OutputKey=='tracksdataurl'].OutputValue[]")

echo "***Creating production build of react app...***"
REACT_APP_TRACKS_DATA_ENDPOINT=${tracksDataEndpointUrl} npm run build

echo "***Package build/ to s3 bucket ${crispyUmbrellaBucketName}...***"
aws s3 sync ../build/ "s3://${crispyUmbrellaBucketName}"

echo "***App link:***"
echo "https://${crispyUmbrellaBucketName}.s3.ap-southeast-2.amazonaws.com/index.html"
