const express = require('express')
const morgan = require ('morgan')
const bodyParser = require('body-parser')
const colors = require('colors')
const { horsesRouter } = require('./routes/horsesRouter')

//App Config
const app = express()
const PORT = process.env.PORT || 5000

//Middleware
    //Morgan
app.use(morgan('tiny'))
    //Body Parser
app.use(bodyParser.json())

//Routes
app.use('/horses', horsesRouter)



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

