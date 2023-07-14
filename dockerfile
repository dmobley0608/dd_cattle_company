FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

#SERVER ENV VARIABLES
ENV SESSION_SECRET = 3fdf728b6febc924ab57c4e91da730d4f4f0dcb7efeffe5dc4538439f9fbc5c7

#DATABASE
ENV DB_USER=postgres
ENV DB_NAME=postgres
ENV DB_HOST=[database host]
ENV DB_PASSWORD=[database password]
ENV DB_PORT=5432

#CLOUDINARY
ENV CLOUD_NAME=[cloudinary name]
ENV CLOUD_API_KEY=[cloudinary api key]
ENV CLOUD_API_SECRET=[cloudinary secret]

EXPOSE 5000
CMD [ "node", "app.js" ]
