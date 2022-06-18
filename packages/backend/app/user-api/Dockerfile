
FROM node:16-alpine

WORKDIR /app

COPY ./packages/backend/app/user-api .

#
# Create the directory /app/etc/config
# - Place for the confiration yaml file
#
RUN mkdir -p etc/config

#
# Install dependencies
#
RUN npm install --production

#
# Required: The path (and filename) to the configuration
#
ENV CONFIG_PATH=/app/etc/config/user-config.yml

VOLUME ["/app/etc/config"]

CMD node ./main.js
