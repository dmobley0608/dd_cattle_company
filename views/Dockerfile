# pull official base image
FROM node:17-alpine as builder

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./

# Installs all node packages
RUN npm install

# Copies everything over to Docker environment
COPY . .
EXPOSE 3000
#Build Production
RUN npm run build --production

#Install serve
RUN npm install -g serve
# start app
CMD serve -s build