FROM node:lts-alpine

# Create app directory
RUN mkdir -p /usr/app/server/
WORKDIR /usr/app/server/

# Install app dependencies
COPY package*.json /usr/app/server/
COPY .env.local /usr/app/server/
RUN npm install

# Bundle app source
COPY . /usr/app/server/

# Set the command when container start running
CMD [ "npm", "start" ]