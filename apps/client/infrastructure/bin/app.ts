import { App } from 'aws-cdk-lib'

import WebStack from '../lib/WebStack'

const app = new App({ outdir: `${process.cwd()}/cdk.out` })

new WebStack(app, 'DevWebStack', {
  env: {
    account: '352835053263',
    region: 'eu-west-1'
  },
  tags: {
    env: 'dev',
    project: 'dev-actions'
  },
  environment: 'dev'
})

new WebStack(app, 'ProdWebStack', {
  env: {
    account: '352835053263',
    region: 'eu-west-1'
  },
  tags: {
    env: 'prod',
    project: 'prod-actions'
  },
  environment: 'prod'
})
