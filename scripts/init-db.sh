# #! /bin/bash

# DO_NOT_TRACK=1

# ENV=$1

# if [[ ! $ENV =~ ^(dev|test|prod)$ ]]; then 
#   echo "[Error]: Environment must either be: 'dev', 'test' or 'prod'"
#   exit 1
# fi

# MONGODB_AUTH_KEYS=$(aws secretsmanager get-secret-value --secret-id mongodb/atlas --output text --query 'SecretString' || echo "Could not retrieve Public and Private keys" && exit 1)

# MONGODB_ATLAS_PUBLIC_API_KEY=$(echo $MONGODB_AUTH_KEYS | jq '.AtlasPublicKey')
# MONGODB_ATLAS_PRIVATE_API_KEY=$(echo $MONGODB_AUTH_KEYS | jq '.AtlasPrivateKey')

# # Create MongoDB API keys for AWS CDK
# ENV_KEYS_EXISTS=$(aws secretsmanager get-secret-value --secret-id $ENV/mongodb/atlas --output text --query 'SecretString')

# if [ -z $ENV_KEYS_EXISTS ]; then 
#   echo "Environment keys do not exists. Creating..."

#   atlas config init
#   MONGODB_AWS_CDK_KEYS=$(atlas organizations apiKeys create --desc "$ENV API keys for AWS CDK")
#   echo $MONGODB_AWS_CDK_KEYS
#   exit 0
# else
#   echo "[Error]: Environment keys already exists"
#   exit 1
# fi

# # MONGODB_API_KEY=$(aws secretsmanager get-secret-value --secret-id $ENV/mongodb/apikey --output text --query 'SecretString')

# # if [ -z "$MONGODB_API_KEY" ]; then
# #   echo "Could not retrieve Secret. Creating one now..."
# #   atlas organizations apikeys list
# # else
# #   echo "exists"
# #   echo $MONGODB_API_KEY
# #   exit 1
# # fi

# # CLOUD_FRONT_DISTRIBUTION_ID=$(aws ssm get-parameter --name /dev/actions/client/cloudFrontDistributionId --output text --query 'Parameter.Value' || echo "Could not retrieve CloudFront Distribution Id" && exit 1)
# # aws s3 sync --delete $DIST s3://$BUCKET
# # aws cloudfront create-invalidation --distribution-id $CLOUD_FRONT_DISTRIBUTION_ID --paths /index.html
