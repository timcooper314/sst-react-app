#!/bin/bash

#export AWS_PROFILE=
#export CDK_DEFAULT_ACCOUNT=
export CDK_DEFAULT_REGION=ap-southeast-2

echo "Installing dependencies..."
cd infrastructure
pip install -r requirements.txt

echo "Package frontend to s3..."
npm run build

echo "Deploying aws infrastructure..."
cdk synth
cdk deploy

#stack_name="InfrastructureStack"
#crispyUmbrellaBucketName=$(aws --output text cloudformation describe-stacks --stack-name $stack_name --query "Stacks[].Outputs[?OutputKey=='crispyumbrellabucket'].OutputValue[]")
#echo ${crispyUmbrellaBucketName}


#aws s3 sync build/ "${crispyUmbrellaBucketName}"
