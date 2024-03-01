# -- Install -- #
FROM node:20-alpine3.19 AS install
RUN apk add --no-cache python3 make g++
RUN apk add --no-cache jq
RUN apk add --no-cache aws-cli
WORKDIR /app
COPY package.json package-lock.json tsconfig.base.json ./
COPY ./packages ./packages
COPY ./apps/client ./apps/client
RUN npm install

# -- Build -- #
FROM install AS build
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# -- Run -- #
FROM build AS run
ENV PORT 3000
ENV NODE_ENV production
EXPOSE 3000
CMD ["sh", "-c", "npx nx run @actions/apps-client:start"]
