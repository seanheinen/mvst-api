FROM node:16-alpine3.11 AS build-env
MAINTAINER Sean Heinen
# RUN apk update && apk add git
WORKDIR /app
# Install app dependencies
COPY package.json /app/
RUN yarn install
# Build app
COPY . .
RUN yarn run build
# Build runtime image
FROM node:16-alpine3.11
EXPOSE 3001
# Drop app from build container
COPY --from=build-env /app/dist /app/dist

# TODO Configure webpack to bundle dependencies into vendor.js and include it in /dist
COPY --from=build-env /app/node_modules /app/node_modules

CMD ["node", "./app/dist/main.js"]
