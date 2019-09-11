FROM node:lts-alpine

# Create app directory
RUN mkdir -p /usr/app/client/
WORKDIR /usr/app/client/

# Install app dependencies
COPY package*.json /usr/app/client/
RUN npm install

# Bundle app source
COPY . /usr/app/client/

# Set the command when container start running
CMD [ "npm", "run serve" ]