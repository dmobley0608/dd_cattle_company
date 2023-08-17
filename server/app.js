const express = require('express')
const path = require("path");
require('dotenv').config();
const session = require('express-session')
const horsesRouter = require('./routes/horsesRouter')
const medicalRouter = require('./routes/medicalRecordsRouter')
const mediaRouter = require('./routes/mediaRouter')
const cors = require('cors');
const userRouter = require('./routes/userRouter')
const multer = require('multer')
const { sequelizeSync } = require('./utils/sequelize')
const connectEnsureLogin = require('connect-ensure-login'); //authorization
const passport = require('./utils/authentication');
const { Horses } = require('./model/horses');
const { Media } = require('./model/media');
const { MedicalRecord } = require('./model/medical_record');


const app = express();
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

                                        //Middleware 
//CORS
const whitelist = ["localhost:3000", 'https://ddcattle.company', 'https://inspector.swagger.io','null']
app.use((req, res, next)=>{  next()   },cors({    
   
    "Access-Control-Allow-Origin":(origin, callback)=>{        
        if(whitelist.indexOf(origin) > -1){
            callback(null, true)
        }else{
            callback(new Error(" Sorry You Do Not Have Permission To Access This Material"))
        }
       },
       'Access-Control-Allow-Credentials':true,   
}))  




//Body Parser

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//Multer
const upload = multer();
 

//Sessions

app.use(session({
    store: new (require('connect-pg-simple')(session))({
        conString: process.env.DB_CONNECTION_STRING,
        tableName: 'session'
    }),   
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: false,    
    sameSite:"none",
    cookie: {
        maxAge: 86400000,
        secure: false,  
        httpOnly:true     
    }
    
}))  

app.use(passport.initialize())
app.use(passport.authenticate('session')) 

//Sequelize
Horses.hasMany(Media, {foreignKey:'horse_id'})
Media.belongsTo(Horses, {keyType:'horse_id'})
Horses.hasMany(MedicalRecord, {foreignKey:'horse_id'})
MedicalRecord.belongsTo(Horses, {keyType:'horse_id'})
sequelizeSync();

                                        //Routes   
app.use('/api/horses', upload.none(), horsesRouter)
app.use('/api/medical-records', upload.none(), medicalRouter)
app.use('/api/media', mediaRouter)
app.use('/api/user', upload.none(), userRouter)
app.get('/api/verify-user', (req, res, next) => {
    const user = req.user
    if (user) {
        res.status(200).json(user);
    } else {
        res.redirect("/login")
    }

});


app.use('/*', (req,res)=>{
    res.sendFile("index.html", {root: path.join(__dirname,"../build")})
})



                                        //Error Handler
app.use((err, req, res, next) => {
console.log('error')
    if (!err.status) {
        err.status = 500
    }
    if (!err.message) {
        err.message = "Oh No! You found a problem. Please try again."
    }
    console.error(`${err.status}-${err.message}`)
    res.status(err.status).send(err.message)
   next()
})

//Open Connection
app.listen(process.env.PORT || 9000, ()=>{
    console.log(`Running on Port: ${process.env.PORT || 9000}`)  
})