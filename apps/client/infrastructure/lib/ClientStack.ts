import { Stack, StackProps } from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import S3Bucket from './constructs/Bucket';

interface ClientStackProps extends StackProps {
  environment: string;
}

export default class ClientStack extends Stack {
  constructor(scope: Construct, id: string, props: ClientStackProps) {
    super(scope, id);

    const { environment } = props;

    new S3Bucket(this, 'S3Bucket', {
      environment
    });
  }
}