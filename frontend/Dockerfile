FROM node:lts-alpine as build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

ENV REACT_APP_API_URL=

RUN npm ci

# Bundle app source
COPY . .

# Build the app
RUN npm run build


FROM httpd:alpine
WORKDIR /usr/local/apache2/htdocs/
COPY --from=build /usr/src/app/build .
