# Actions

![CI](https://github.com/ashleyjtaylor/actions/actions/workflows/ci.yml/badge.svg)
![Deploy](https://github.com/ashleyjtaylor/actions/actions/workflows/deploy.yml/badge.svg)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ashleyjtaylor_actions&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ashleyjtaylor_actions)

---

Playing around with `nx` and `github actions`.

## Pre-requisite

- AWS credentials set in `~/.aws/credentials`
- Add `dev` and `prod` environments in the github repo
- Add SonarCloud token as a repository secret in the github repo
- Open MongoDB Atlas account:
  - Create an organisation API key for AWS CDK access
  - Store them in `AWS SecretsManager` under `mongodb/atlas`:
    - `AtlasPublicKey`
    - `AtlasPrivateKey`
    - `AtlasOrganisationId`

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
