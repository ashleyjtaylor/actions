import { Construct } from 'constructs';
import { StackProps } from 'aws-cdk-lib';
import {
  Effect,
  OpenIdConnectProvider,
  PolicyDocument,
  PolicyStatement,
  Role,
  WebIdentityPrincipal
} from 'aws-cdk-lib/aws-iam';

export interface OIDCProviderProps extends StackProps {
  issuer: string;
  githubOwner: string;
  githubRepo: string;
}

export default class OIDCProvider extends Construct {
  constructor(scope: Construct, id: string, props: OIDCProviderProps) {
    super(scope, id);

    const { issuer, githubOwner, githubRepo } = props;

    const provider = new OpenIdConnectProvider(this, 'OIDCProvider', {
      url: `https://${issuer}`,
      clientIds: ['sts.amazonaws.com']
    });

    new Role(this, 'OIDCProviderRole', {
      roleName: 'oidc-provider-role',
      description: 'Allow GitHub actions to connect to AWS',
      assumedBy: new WebIdentityPrincipal(provider.openIdConnectProviderArn, {
        StringLike: {
          [`${issuer}:sub`]: `repo:${githubOwner}/${githubRepo}:*`
        },
        StringEquals: {
          [`${issuer}:aud`]: 'sts.amazonaws.com'
        }
      }),
      inlinePolicies: {
        OIDCProviderRolePolicy: new PolicyDocument({
          statements: [
            new PolicyStatement({
              sid: 'CdkDeploymentPermissions',
              actions: ['sts:AssumeRole'],
              resources: ['arn:aws:iam::*:role/cdk-*'],
              effect: Effect.ALLOW
            })
          ]
        })
      }
    });
  }
}
