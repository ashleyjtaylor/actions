import { Construct } from 'constructs';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { RemovalPolicy, StackProps } from 'aws-cdk-lib/core';

interface S3BucketProps extends StackProps {
  environment: string;
}

export default class S3Bucket extends Construct {
  constructor(scope: Construct, id: string, props: S3BucketProps) {
    super(scope, id);

    const { environment } = props;

    const bucket = new Bucket(this, 'Bucket', {
      removalPolicy: RemovalPolicy.DESTROY
    });

    new StringParameter(this, 'BucketParameter', {
      parameterName: `/${environment}/actions/ssm/client/bucketArn`,
      stringValue: bucket.bucketArn,
      description: `${environment} client bucketArn`
    });
  }
}
