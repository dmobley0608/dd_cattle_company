require('dotenv').config()
const express = require('express')
const morgan = require ('morgan')
const session = require('express-session')
const colors = require('colors')
const  horsesRouter = require('./routes/horsesRouter')
const medicalRouter = require('./routes/medicalRecordsRouter') 
const mediaRouter = require('./routes/mediaRouter')
const cors = require('cors');
const multer = require('multer')
const upload = multer();
//App Config
const app = express() 
const PORT = process.env.PORT || 5000

//Middleware 
    //CORS
    app.use(cors({
        origin: '*'
    })) 
    //Morgan
app.use(morgan('tiny'))
    //Body Parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))
    //MULTER
app.use(upload.array())

    //Sessions
const store = new session.MemoryStore()
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized:false,
    store,
    cookie:{
        maxAge:86400000,
        secure:true,
        sameSite:"none"
      }
}))
//Routes   
app.use('/horses', horsesRouter)   
app.use('/medical-records', medicalRouter )
app.use('/media', mediaRouter)


//Error Handler
app.use((err, req, res, next)=>{
   
    if(!err.status){
        err.status = 500
    }
    if(!err.message){
        err.message = "Oh No! You found a problem. Please try again."
    }
    console.error(`${err.status}-${err.message}`.red)
    res.status(err.status).send(err.message)
})

//Open Connection
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})

