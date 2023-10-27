import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { AtlasBasic } from 'awscdk-resources-mongodbatlas';

interface AtlasStackProps extends StackProps {
  readonly projectName: string;
  readonly clusterName: string;
  readonly profile: string;
  readonly ip: string;
}

export default class AtlasStack extends Stack {
  constructor(scope: Construct, id: string, props: AtlasStackProps) {
    super(scope, id, props);

    const { ip, clusterName, projectName, profile } = props;

    const mongodbAtlasSecret = Secret.fromSecretNameV2(
      this,
      'MongoDBAtlasSecrets',
      `cfn/atlas/profile/${profile}`
    );

    new AtlasBasic(this, 'AtlasBasic', {
      profile,
      projectProps: {
        name: projectName,
        orgId: mongodbAtlasSecret
          .secretValueFromJson('OrganisationId')
          .toString()
      },
      dbUserProps: {
        username: `${profile}-aws-cdk`,
        password: 'MongoDBAtlasAccess'
      },
      ipAccessListProps: {
        accessList: [{ ipAddress: ip, comment: 'AWS CDK IP address' }]
      },
      clusterProps: {
        name: clusterName,
        replicationSpecs: [
          {
            numShards: 1,
            advancedRegionConfigs: [
              {
                electableSpecs: {
                  ebsVolumeType: 'STANDARD',
                  instanceSize: 'M10',
                  nodeCount: 3
                },
                priority: 7,
                regionName: 'EU_WEST_1',
                backingProviderName: 'AWS'
              }
            ]
          }
        ]
      }
    });
  }
}
