#!/bin/bash

#export AWS_PROFILE=
#export CDK_DEFAULT_ACCOUNT=
export CDK_DEFAULT_REGION=ap-southeast-2

echo "Installing dependencies..."
pip install -r requirements.txt

echo "Deploying aws infrastructure..."
cdk synth
cdk deploy
