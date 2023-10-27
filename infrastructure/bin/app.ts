import { App } from 'aws-cdk-lib';

import ToolsStack from '../lib/ToolsStack';
import AtlasStack from '../lib/AtlasStack';

const app = new App({ outdir: `${process.cwd()}/cdk.out` });

const toolsStack = new ToolsStack(app, 'ToolsStack', {
  env: {
    account: '352835053263',
    region: 'eu-west-1'
  },
  tags: {
    env: 'tools',
    project: 'tools-actions'
  }
});

const atlasStack = new AtlasStack(app, 'MongoDBAtlasStack', {
  env: {
    account: '352835053263',
    region: 'eu-west-1'
  },
  tags: {
    env: 'mongodb-atlas',
    project: 'mongodb-atlas-actions'
  },
  ip: '86.179.88.97',
  clusterName: 'Cluster0',
  projectName: 'dev-database',
  profile: 'dev'
});

atlasStack.addDependency(
  toolsStack,
  'Requires execution role created in ToolsStack'
);
