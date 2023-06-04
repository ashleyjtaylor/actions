# Actions

![Pull request](https://github.com/ashleyjtaylor/actions/actions/workflows/pull-request.yml/badge.svg)
![Deploy](https://github.com/ashleyjtaylor/actions/actions/workflows/deploy.yml/badge.svg)

---

Playing around with `nx` and `github actions`.

## Pre-requisite

- AWS credentials set in `~/.aws/credentials`
- Add `dev` and `prod` environments in your github repo

## Setup

First, update `githubOwner` and `githubRepo` in `apps/infrastructure/lib/ToolsStack.ts` with your username and repo name.

Run:

```bash
npm i
cd apps/infrastructure
npm run cdk:deploy
```

This will install all monorepo dependencies and will deploy a `ToolsStack` to your AWS account. The stack will allow github actions to interact with your AWS account, i.e. assume roles in order to run `cdk deploy`.
