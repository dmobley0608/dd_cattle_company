require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const colors = require('colors')
const horsesRouter = require('./routes/horsesRouter')
const medicalRouter = require('./routes/medicalRecordsRouter')
const mediaRouter = require('./routes/mediaRouter')
const cors = require('cors');
const authRouter = require('./routes/authenticationRouter')
const passport = require('passport')
const pool = require('./model/postgres')
const multer = require('multer')
const { getUser } = require('./controllers/authentication')

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
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
        maxAge: 86400000,
        secure: true,
        sameSite: "none"
    }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.authenticate('session'))
//Routes   
app.use('/horses',upload.none(), horsesRouter)
app.use('/medical-records',upload.none(), medicalRouter)
app.use('/media', mediaRouter)
app.use('/user', upload.none(), authRouter)


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

