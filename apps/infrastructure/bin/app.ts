import { App, StackProps } from 'aws-cdk-lib';

import OIDCProviderStack from '../src/OIDCProviderStack';

const app = new App({ outdir: `${process.cwd()}/cdk.out` });

const stackProps: StackProps = {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
};

new OIDCProviderStack(app, 'OIDCProviderStack', {
  ...stackProps,
  issuer: 'token.actions.githubusercontent.com',
  githubOwner: 'ashleyjtaylor',
  githubRepo: 'actions'
});
