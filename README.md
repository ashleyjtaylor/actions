# Actions

![CI](https://github.com/ashleyjtaylor/actions/actions/workflows/ci.yml/badge.svg)
![Deploy](https://github.com/ashleyjtaylor/actions/actions/workflows/deploy.yml/badge.svg)

---

Playing around with `nx` and `github actions`.

## Pre-requisite

- AWS credentials set in `~/.aws/credentials`
- Add `dev` and `prod` environments in your github repo
- Open MongoDB Atlas account:
  - Create an organisation API key for AWS CDK access
  - Store them in `AWS SecretsManager` under `cfn/atlas/profile/dev`:
    - `PublicKey`
    - `PrivateKey`
    - `OrganisationId`
- Activate AWS CloudFormation Third-Party extensions for MongoDB Project and Cluster
  - Set `arn` as the one created by `cdk bootstrap`

## Setup

First, update `githubOwner` and `githubRepo` in `apps/infrastructure/lib/ToolsStack.ts` with your username and repo name.

Run:

```bash
npm i
cd apps/infrastructure
npm run cdk:deploy
```

This will install all monorepo dependencies and will deploy a `ToolsStack` to your AWS account. The stack will allow github actions to interact with your AWS account, i.e. assume roles in order to run `cdk deploy`.

## Commits

Repo follows a [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/) system. This is re-inforced by `commitlint`.

- `fix:` - will create a `patch` version update of the changed package
- `feat:` - will create a `minor` version update of the changed package
- `BREAKING CHANGE:` - will create a `major` version update of the changed package
- `chore:` - for minor changes to the monorepo.
- `docs:` - for changes to documentation files
