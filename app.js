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

app.param('/horses/:id', (req, res, next, id)=>{
    console.log('fetching horse')
    let horseId = Number(id)
    index = 1    
    if(index !== -1){
        console.log('valid id')
        req.horseIndex = 1
        console.log(req.horseIndex)
        next();
    }else{
        let error = new Error("Horse Not Found")
        error.status = 404
        error.message = "Horse Not Found"
       next(error)
    }
})

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

