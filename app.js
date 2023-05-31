const express = require('express')
const morgan = require ('morgan')
const { horsesRouter } = require('./routes/horsesRouter')

//App Config
const app = express()
const PORT = process.env.PORT || 5000

//Middleware
app.use(morgan('tiny'))

//Routes
app.use('/horses', horsesRouter)



//Open Connection
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})