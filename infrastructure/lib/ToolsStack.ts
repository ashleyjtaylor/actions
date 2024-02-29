import { Construct } from 'constructs'
import { Stack, StackProps } from 'aws-cdk-lib'

import OIDCProvider from './constructs/OIDCProvider'

export default class ToolsStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props)

    new OIDCProvider(this, 'OIDCProvider', {
      region: props.env.region,
      issuer: 'token.actions.githubusercontent.com',
      githubOwner: 'ashleyjtaylor',
      githubRepo: 'actions'
    })
  }
}
