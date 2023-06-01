import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import {
  Effect,
  OpenIdConnectProvider,
  PolicyDocument,
  PolicyStatement,
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

    // console.log(this.node.tryGetContext('env'));

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
      }),
      inlinePolicies: {
        OIDCProviderRolePolicy: new PolicyDocument({
          statements: [
            new PolicyStatement({
              sid: 'CloudFormationPermissions',
              effect: Effect.ALLOW,
              actions: [
                'cloudformation:CreateChangeSet',
                'cloudformation:DeleteChangeSet',
                'cloudformation:DescribeChangeSet',
                'cloudformation:DescribeStacks',
                'cloudformation:ExecuteChangeSet',
                'cloudformation:CreateStack',
                'cloudformation:UpdateStack'
              ],
              resources: ['*']
            })
          ]
        })
      }
    });
  }
}
