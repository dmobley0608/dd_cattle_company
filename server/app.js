const express = require('express')
const path = require("path");
require('dotenv').config();
const morgan = require('morgan')
const session = require('express-session')
const colors = require('colors')
const horsesRouter = require('./routes/horsesRouter')
const medicalRouter = require('./routes/medicalRecordsRouter')
const mediaRouter = require('./routes/mediaRouter')
const cors = require('cors');
const userRouter = require('./routes/userRouter')
const multer = require('multer')
const { sequelizeSync } = require('./utils/sequelize')
const {expressjwt} = require('express-jwt')


const app = express();
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

                                        //Middleware 
//CORS
const whitelist = ["localhost:3000", 'https://ddcattle.company', 'https://inspector.swagger.io','null']
app.use((req, res, next)=>{  console.log(req.get('origin')); next()   },cors({    
   
    "Access-Control-Allow-Origin":(origin, callback)=>{        
        if(whitelist.indexOf(origin) > -1){
            callback(null, true)
        }else{
            callback(new Error(" Sorry You Do Not Have Permission To Access This Material"))
        }
       },
       'Access-Control-Allow-Credentials':true,   
})) 



//Morgan
app.use(morgan('tiny'))
//Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//Multer
const upload = multer();
//Sessions
const store =new session.MemoryStore()
app.use(session({

    secret: 'kitycat',
    resave: false, 
    saveUninitialized: false,
    store,
    cookie: {
        maxAge: 86400000,
        secure: false,
        sameSite: "none"
    },
    role: ''
}))  

//JWT

//Sequelize
sequelizeSync();


                                        //Routes   
app.use('/horses', upload.none(), horsesRouter)
app.use('/medical-records', upload.none(), medicalRouter)
app.use('/media', mediaRouter)
app.use('/user', upload.none(), userRouter)


                                        //Error Handler
app.use((err, req, res, next) => {
console.log('error')
    if (!err.status) {
        err.status = 500
    }
    if (!err.message) {
        err.message = "Oh No! You found a problem. Please try again."
    }
    console.error(`${err.status}-${err.message}`.red)
    res.status(err.status).send(err.message)
})

//Open Connection
app.listen(process.env.PORT || 9000, ()=>{
    console.log(`Running on Port: ${process.env.PORT || 9000}`)  
})