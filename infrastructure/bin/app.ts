import { App } from 'aws-cdk-lib';

import ToolsStack from '../lib/ToolsStack';

const app = new App({ outdir: `${process.cwd()}/cdk.out` });

new ToolsStack(app, 'ToolsStack', {
  env: {
    account: '352835053263',
    region: 'eu-west-1'
  },
  tags: {
    env: 'tools',
    project: 'tools-actions'
  }
});
