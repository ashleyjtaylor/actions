import { Construct } from 'constructs';
import { Bucket, HttpMethods, BlockPublicAccess } from 'aws-cdk-lib/aws-s3';
import {
  OriginAccessIdentity,
  Distribution,
  ViewerProtocolPolicy,
  CachePolicy,
  OriginRequestPolicy,
  ResponseHeadersPolicy
} from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib/core';

interface WebStackProps extends StackProps {
  environment: string;
}

export default class WebStack extends Stack {
  constructor(scope: Construct, id: string, props: WebStackProps) {
    super(scope, id);

    const { environment } = props;

    const bucket = new Bucket(this, 'Bucket', {
      bucketName: `${environment}-ash-actions-monorepo`,
      removalPolicy: RemovalPolicy.DESTROY,
      blockPublicAccess: new BlockPublicAccess({
        blockPublicAcls: false,
        blockPublicPolicy: true,
        ignorePublicAcls: true,
        restrictPublicBuckets: true
      }),
      cors: [
        {
          allowedMethods: [HttpMethods.GET],
          allowedOrigins: ['*'],
          exposedHeaders: ['Access-Control-Allow-Origin']
        }
      ]
    });

    const originAccessIdentity = new OriginAccessIdentity(
      this,
      'OriginAccessIdentity'
    );
    bucket.grantRead(originAccessIdentity);

    const distribution = new Distribution(this, 'Distribution', {
      defaultBehavior: {
        viewerProtocolPolicy: ViewerProtocolPolicy.HTTPS_ONLY,
        origin: new S3Origin(bucket, {
          originAccessIdentity
        }),
        cachePolicy: CachePolicy.CACHING_OPTIMIZED,
        originRequestPolicy: OriginRequestPolicy.CORS_S3_ORIGIN,
        responseHeadersPolicy:
          ResponseHeadersPolicy.CORS_ALLOW_ALL_ORIGINS_AND_SECURITY_HEADERS
      }
    });

    new StringParameter(this, 'BucketParameter', {
      parameterName: `/${environment}/actions/client/bucketArn`,
      stringValue: bucket.bucketArn,
      description: `${environment} client bucketArn`
    });

    new StringParameter(this, 'CloudFrontDistributionParameter', {
      parameterName: `/${environment}/actions/client/cloudFrontDistributionId`,
      stringValue: distribution.distributionId,
      description: `${environment} client cloudFrontDistributionId`
    });
  }
}
