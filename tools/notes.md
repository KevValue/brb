# Notes

## Network debugging

### Problem
Lambda poll was stalling. Upon checking the SSM parameter store, the expected parameter did not exist. This indicates that the SSM API Call initiated with the SSM command in user data was either hanging or timed out - a possibl network issue.

### Solution
SSM command uses TLS 443 under the hood.
Allow inbound and outbound port 443 on VPC level NACL.
Parameter exists.

## Lambda Debugging

### Problem
Lambda function is not sending a response to Cloudformation, even tho parameter exists. Upon checking the log group in CloudWatch, there was a module import error message.

### Solution
Rewrote lambda function with AWS console - code completion and correct imports via aws-sdkv3. Also deployed and tested manually before moving code to cloudformation stack.

### Problem
Lambda function timed out in 3 seconds on the first test run upon checking CloudWatch Logs.

### Solution
Configured the max invocation duration to 30 seconds, allow ample time for lambda function to start up and complete 1st polling.

### Problem
Lambda threw an exception due to try and catch console.error(). Lambda function is missing actions on resources such as getting function name in order to invoke itself for async recursion polling. Inline policies also do not indicate any entity attachment.

### Solution
Created a new inline permission policy with required actions on lambda arn. Inline policies don't need to indicate entity attachment unlike managed permission policies. After attaching inline policy to execution role, Function successfully invoked itself.

### Problem
Parameter still exists after deleting entire stack.

### Solution
Revise Lambda code to delete the parameter after successfully polling the value and sending a response back to cloudformation.

## Design choices

Lambda functions have a 15 minute runtime constraint before they time out. For polling times of longer than 15 minutes, async recursion is acceptable. The alternative is to invoke a lambda function for as long as possible, 15 minutes, and then invoke again.

The choice was to go with a long polling lambda to avoid cold starts.

AMI creation follows an event-driven architecture in AWS, where events are eventually consistent within the data plane. To orchestrate these events through the control plane, the following solutions were considered:

- Lambda persists the state of retries and successful API calls, managing the execution flow based on the event-driven architecture.
- EventBridge orchestrates events, where the state of AMI creation triggers subsequent actions.
- SNS decouples messaging, allowing multiple Lambda functions to process the same event.
- SQS handles message persistence, manages retries, and processes long-running operations sequentially.

A good reason to go with Lambda over the other solutions (SNS, SQS, EventBridge) is granular control over logic and state persistence. Lambda functions allow for custom business logic in response to specific events, such as checking the state of the AMI creation, managing retries, and persisting state without relying on external systems for processing. Plus many of AWS events are driven by lambdas under the hood, getting familiar with lambdas open possibilites for more complex integrations and workflows. Scalability was also considered but not considered a trade off, because ami-creation happens sparsely and will not hit the lambda concurrent limit.
