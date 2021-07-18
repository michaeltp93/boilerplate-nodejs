FROM node:14
WORKDIR /app
COPY package.json .
RUN yarn install
RUN yarn add -D @types/sap__xsenv

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then yarn install; \
    else yarn install --only=production; \
    fi

COPY . .
ENV PORT 8080
EXPOSE $PORT
CMD ["yarn", "start"]
