#!/usr/bin/env python3
import os

from aws_cdk import core as cdk
from stacks.infrastructure_stack import InfrastructureStack


app = cdk.App()
InfrastructureStack(app, "InfrastructureStack",
             env=cdk.Environment(account=os.getenv('CDK_DEFAULT_ACCOUNT'),
                                 region=os.getenv('CDK_DEFAULT_REGION')),
    )

app.synth()
