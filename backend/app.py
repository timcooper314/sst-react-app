#!/usr/bin/env python3
import os

from aws_cdk import core as cdk
from backend.backend_stack import BackendStack


app = cdk.App()
BackendStack(app, "BackendStack",
             env=cdk.Environment(account=os.getenv('CDK_DEFAULT_ACCOUNT'),
                                 region=os.getenv('CDK_DEFAULT_REGION')),
    )

app.synth()
