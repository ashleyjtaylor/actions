# -- Setup -- #
FROM node:20-alpine3.19 AS setup
RUN apk add --no-cache python3 make g++
RUN apk add --no-cache jq
RUN apk add --no-cache aws-cli

# -- Install -- #
FROM setup AS install
WORKDIR /app
COPY package.json package-lock.json tsconfig.base.json ./
COPY ./packages ./packages
COPY ./apps/client ./apps/client
RUN npm install --ignore-scripts

# -- Build -- #
FROM install AS build
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# -- Production -- #
FROM setup AS prod
WORKDIR /app
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/apps/client/dist ./apps/client/dist
COPY --from=build /app/apps/client/.next ./apps/client/.next
COPY --from=build /app/apps/client/package.json ./apps/client/
COPY --from=build /app/packages ./packages
RUN npm install --omit=dev --ignore-scripts

# -- Run -- #
FROM prod AS run
ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000
USER node
CMD ["sh", "-c", "npm run start -w @actions/apps-client"]
