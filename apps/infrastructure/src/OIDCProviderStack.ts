import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import {
  OpenIdConnectProvider,
  Role,
  WebIdentityPrincipal
} from 'aws-cdk-lib/aws-iam';

export interface OIDCProviderStackProps extends StackProps {
  issuer: string;
  githubOwner: string;
  githubRepo: string;
}

export default class OIDCProviderStack extends Stack {
  constructor(scope: Construct, id: string, props: OIDCProviderStackProps) {
    super(scope, id, props);

    const { issuer, githubOwner, githubRepo } = props;

    const provider = new OpenIdConnectProvider(this, 'OIDCProvider', {
      url: `https://${issuer}`,
      clientIds: ['sts.amazonaws.com']
    });

    new Role(this, 'OIDCProviderRole', {
      roleName: 'oidc-provider-role',
      assumedBy: new WebIdentityPrincipal(provider.openIdConnectProviderArn, {
        StringLike: {
          [`${issuer}:sub`]: `repo:${githubOwner}/${githubRepo}:*`
        },
        StringEquals: {
          [`${issuer}:aud`]: 'sts.amazonaws.com'
        }
      })
    });
  }
}
