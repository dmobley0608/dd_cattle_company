
# DD CATTLE COMPANY
  This is a simple front and backend project that allows the DD Cattle Company to display their animals and keep track of their records. This program can be easily modified to adapt with any business.
  **UPDATED 8/12/2023 TO UTILIZE EXPRESS AND SERVE BACKEND WITH REACT STATIC BUILD FOLDER

## Installation
  **This project relies on a postgres database. Be sure to have a database already created. This project also utilizes ImageKit. A free account can be created [here](https://imagekit.io/).**
  1. Navigate into root.
  2. run npm install

## Usage
  1. Navigate into root folder.
 2. run cmd "npm run dev" (Builds front end and starts server using nodemon)
    -Note "npm start" may also be used however this will start the server using the node cmd.
  6. Open Browser and navigate to localhost:9000 - Homepage
## Libraries
  1. Nodejs/Express
  2. React
  3. Postgres
  4. ImageKit --used to store images-- [More Info](https://imagekit.io/)
  5. Sequelize [More Info ](https://sequelize.org/) 
    

  ## DOCKER
  This project includes a docker file. The following commands can be used to configure a docker container.
  ### Create Docker Image
    1. Open terminal
    2. Run docker build -t <name of image> . <- The period is important   
   ### Example Command**
    "docker build -t ddc-be ."
  ### Run Docker container
    1. Enter "docker run --name <name of container> -p 9000:9000 <image name from previous steps>" into terminal   
    3. enter "--env" followed by required variable and =value below
        -example --env DB_USER=<DB_USER>
        
   ### EXAMPLE COMMAND
        docker run --name ddcattle -p 5000:5000 ddcattle 
        --env DB_USER=admin --env DB_NAME=ddcattle --env DB_HOST=localhost 
        --env DB_PASSWORD=123 --env DB_PORT=5432 --env DB_CONNECTION_STRING=postgres://postgres:1234@database.com:5432/postgres --env IMAGE_KIT_PRIVATE_KEY=askdjfakjfl;ajsdfioa 
        --env IMAGE_KIT_PUBLIC_KEY=12345 --env IMAGE_KIT_URL=https://imagekit.io/akldiuoa
   ### Docker Hub
     1. Open Docker Hub
     2. Click on images
     3. Click run beside the image that was previously created with the docker build command
     4. Select Optional Settings
     5. enter 9000 into Host port field
     6. Add variables listed below into environment variables section

   ### Variables For Docker
      1. DB_USER - the database user example... dmo      
      2. DB_NAME - name of database to be used
      3. DB_HOST - example localhost or 123.4.5.6
      4. DB_PASSWORD - the password associated with the user above
      5. DB_PORT - database port default is 5432
      6. DB_CONNECTION_STRING = postgres://postgres:<database password>@<database host>:5432/<database name>
      6. IMAGE_KIT_PUBLIC_KEY= obtained from ImageKit account
      7. IMAGE_KIT_PRIVATE_KEY= obtained from ImageKit account
      8. IMAGE_KIT_URL= obtained from ImageKit account


