# DD CATTLE COMPANY
  This is a simple front and backend project that allows the DD Cattle Company to display their animals and keep track of their records. This program can be easily modified to adapt with any business.

## Installation
  **This project relies on a postgres database. Be sure to have a database already created. This project also utilizes Cloudinary. A free account can be created [here](https://cloudinary.com/).**
  1. Navigate into root.
  2. run npm install
  3. Navigate into views folder
  4. run npm install
## Usage
  1. Navigate into root folder.
  2. run npm start
  3. Open another terminal.
  4. Navigate to the views folder
  5. run npm start
  6. Browser should open to localhost:3000 - Homepage
## Libraries
  1. Nodejs/Express
  2. React
  3. Postgres
  4. Cloudinary --used to store images-- [More Info](https://cloudinary.com/)
  5. Sequelize [More Info ](https://sequelize.org/) 
    <br/>**Used for ORM**

  ## DOCKER
  This project includes a docker file. The following commands can be used to configure a docker container.
  ### Create Docker Image
    1. Open terminal
    2. Run docker build -t <name of image> . <- The period is important   
   ### Example Command**
    "docker build -t ddc-be ."
  ### Run Docker container
    1. Enter "docker run --name <name of container> -p 5000:5000 <image name from previous steps>" into terminal   
    3. enter "--env" followed by required variable and =value below
        -example --env DB_USER=dmo
        
   ### EXAMPLE COMMAND
        docker run --name ddcattle -p 5000:5000 ddcattle 
        --env DB_USER=admin --env DB_NAME=ddcattle --env DB_HOST=localhost 
        --env DB_PASSWORD=123 --env DB_PORT=5432 --env CLOUD_NAME=cloudinary 
        --env CLOUD_API_KEY=12345 --env CLOUD_API_SECRET=aChDieald-wlkjd
   ### Docker Hub
     1. Open Docker Hub
     2. Click on images
     3. Click run beside the image that was previously created
     4. Select Optional Settings
     5. enter 5000 into Host port field
     6. Add variables listed below into environment variables section

   ### Variables For Docker
      1. DB_USER - the database user example... dmo      
      2. DB_NAME - name of database to be used
      3. DB_HOST - example localhost or 123.4.5.6
      4. DB_PASSWORD - the password associated with the user above
      5. DB_PORT - database port default is 5432
      6. CLOUD_NAME - obtained from cloudinary
      7. CLOUD_API - obtained from cloudinary
      8. CLOUD_API_SECRET - obtained from cloudinary
