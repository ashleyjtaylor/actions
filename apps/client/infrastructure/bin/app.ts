import { App } from 'aws-cdk-lib';

import ClientStack from '../lib/ClientStack';

const app = new App({ outdir: `${process.cwd()}/cdk.out` });

new ClientStack(app, 'DevClientStack', {
  env: {
    account: '352835053263',
    region: 'eu-west-1'
  },
  tags: {
    env: 'dev',
    project: 'dev-actions'
  },
  environment: 'dev'
});

new ClientStack(app, 'ProdClientStack', {
  env: {
    account: '352835053263',
    region: 'eu-west-1'
  },
  tags: {
    env: 'prod',
    project: 'prod-actions'
  },
  environment: 'prod'
});
