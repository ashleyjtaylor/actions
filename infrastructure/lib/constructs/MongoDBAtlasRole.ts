import { Construct } from 'constructs';
import {
  CompositePrincipal,
  Effect,
  PolicyDocument,
  PolicyStatement,
  Role,
  ServicePrincipal
} from 'aws-cdk-lib/aws-iam';

export default class MongoDBAtlasRole extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new Role(this, 'MongoDBAtlasRole', {
      roleName: 'mongodb-atlas-execution-role',
      description: 'Allow execution for MongoDB Atlas resources',
      assumedBy: new CompositePrincipal(
        new ServicePrincipal('lambda.amazonaws.com'),
        new ServicePrincipal('cloudformation.amazonaws.com'),
        new ServicePrincipal('resources.cloudformation.amazonaws.com')
      ),
      inlinePolicies: {
        MongoDBAtlasRole: new PolicyDocument({
          statements: [
            new PolicyStatement({
              effect: Effect.ALLOW,
              sid: 'CdkDeploymentPermissions',
              resources: ['*'],
              actions: [
                'sts.amazonaws.com',
                'secretsmanager:CreateSecret',
                'secretsmanager:CreateSecretInput',
                'secretsmanager:DescribeSecret',
                'secretsmanager:GetSecretValue',
                'secretsmanager:PutSecretValue',
                'secretsmanager:UpdateSecretVersionStage',
                'ec2:CreateVpcEndpoint',
                'ec2:DeleteVpcEndpoints',
                'cloudformation:CreateResource',
                'cloudformation:DeleteResource',
                'cloudformation:GetResource',
                'cloudformation:GetResourceRequestStatus',
                'cloudformation:ListResources',
                'cloudformation:UpdateResource',
                'iam:AttachRolePolicy',
                'iam:CreateRole',
                'iam:DeleteRole',
                'iam:GetRole',
                'iam:GetRolePolicy',
                'iam:ListAttachedRolePolicies',
                'iam:ListRolePolicies',
                'iam:PutRolePolicy'
              ]
            })
          ]
        })
      }
    });
  }
}
