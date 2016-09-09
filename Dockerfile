FROM node:4.4-slim

ENV NODE_ENV development
LABEL traefik.enable="false"

WORKDIR /opt/node/
COPY . /opt/node/

# COPY versionFile /opt/

RUN npm install --silent && \
    npm install --silent  -g nodemon

## Note: If any build steps change the data within the volume after it has been declared, those changes will be discarded.
## https://docs.docker.com/engine/reference/builder/#volume
VOLUME /opt/node/

EXPOSE 8877

CMD npm start
