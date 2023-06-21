require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const colors = require('colors')
const horsesRouter = require('./routes/horsesRouter')
const medicalRouter = require('./routes/medicalRecordsRouter')
const mediaRouter = require('./routes/mediaRouter')
const cors = require('cors');
const userRouter = require('./routes/userRouter')
const multer = require('multer')
const passport = require('passport')


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
app.use(express.urlencoded({ extended: true }))
//Multer
const upload = multer();
 



//Sessions

const store = new session.MemoryStore()
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
    role:''
}))

//PASSPORT
const LocalStrategy=require('passport-local')
const { Users } = require('./model/user')
const { compareHash } = require('./utils/helper')
passport.use(new LocalStrategy({usernameField:'email'},async function (email, password, cb){
   
    const user = await Users.findOne({where:{email:email}})   
    if(!user) return cb(null,false)
    const match = compareHash(password, user.password)
    if(!match) return cb(null,false)
    const result = user.get()
    return cb(null, {email:result.email, role:result.role})
}))

passport.serializeUser(function(user, done) {
    console.log('serialize user')   
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {   
    done(null, user);
  });
  
app.use(passport.initialize())
app.use(passport.session())

app.use((req,res, next)=>{
    console.log(req.user)
    next()
})

//Routes   
app.use('/horses',upload.none(), horsesRouter)
app.use('/medical-records',upload.none(), medicalRouter)
app.use('/media', mediaRouter)
app.use('/user', upload.none(), userRouter)




//Error Handler
app.use((err, req, res, next) => {

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
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

