import { Construct } from 'constructs';
import { Role } from 'aws-cdk-lib/aws-iam';
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
      websiteIndexDocument: 'index.html',
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
    bucket.grantReadWrite(
      Role.fromRoleName(this, 'OIDCProviderRole', 'oidc-provider-role')
    );

    const distribution = new Distribution(this, 'Distribution', {
      defaultRootObject: 'index.html',
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

    new StringParameter(this, 'BucketNameParameter', {
      parameterName: `/${environment}/actions/client/bucketName`,
      stringValue: bucket.bucketName,
      description: `${environment} client bucketName`
    });

    new StringParameter(this, 'CloudFrontDistributionIdParameter', {
      parameterName: `/${environment}/actions/client/cloudFrontDistributionId`,
      stringValue: distribution.distributionId,
      description: `${environment} client cloudFrontDistributionId`
    });
  }
}
