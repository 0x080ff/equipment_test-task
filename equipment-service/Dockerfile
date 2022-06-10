FROM node:14-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN NODE_ENV=production npm run build

FROM node:14-alpine3.12

WORKDIR /app
COPY --from=build /app /app
RUN mkdir /app/public/uploads/tmp

EXPOSE 1337
CMD [ "npm", "start" ]
