import { Stack, StackProps } from 'aws-cdk-lib/core';
import { Construct } from 'constructs';

interface ClientStackProps extends StackProps {
  environment: string;
}

export default class ClientStack extends Stack {
  constructor(scope: Construct, id: string, props: ClientStackProps) {
    super(scope, id, props);
  }
}
