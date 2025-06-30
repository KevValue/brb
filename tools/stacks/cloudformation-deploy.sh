#!/bin/bash

## exit if any commands returns a non-zero signal
set -e

aws cloudformation deploy --stack-name brb-network-infra-stack --template-file cloudformation-network-infrastructure.yaml --capabilities CAPABILITY_NAMED_IAM
aws cloudformation wait stack-create-complete --stack-name brb-network-infra-stack

aws cloudformation deploy --stack-name brb-nat-ami-stack --template-file cloudformation-create-nat-ami.yaml --capabilities CAPABILITY_NAMED_IAM
aws cloudformation wait stack-create-complete --stack-name brb-nat-ami-stack

aws cloudformation deploy --stack-name brb-lambda-polling-stack --template-file cloudformation-lambda-polling.yaml --capabilities CAPABILITY_NAMED_IAM
aws cloudformation wait stack-create-complete --stack-name brb-lambda-polling-stack

aws cloudformation deploy --stack-name brb-instances-stack --template-file cloudformation-deploy-instances.yaml --capabilities CAPABILITY_NAMED_IAM
aws cloudformation wait stack-create-complete --stack-name brb-instances-stack

echo "All stacks deployed successfully."
