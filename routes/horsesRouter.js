const express = require('express')

const horsesRouter = express.Router()
//TEMP DATA
const horses = [{id:'1', name:"Dancer"}, {id:'2', name:'Titus'}, {id:'3', name:'Henry'}]

//Middleware
const getHorseById=(req, res, next)=>{
    const {id} = req.params
    req.horse = horses.filter(horse=>horse.id === id)[0]
    next()
}

//Get all Horses
horsesRouter.get('/', (req, res,next)=>{
    res.send(horses)
}) 

//Get Horse By Id
horsesRouter.get('/:id', getHorseById, (req, res, next)=>{    
    if(req.horse){
        res.send(req.horse)
    }else{
       let error = new Error("Horse Not Found")
       error.status = 404
       error.message = "Horse Not Found"
       throw error
    }
})

//Add Horse
horsesRouter.post('/', (req, res,next)=>{
    const {name, id} = req.body  
    const horse = {id, name} 
    if(horse.name && horse.id){
        horses.push(horse)
        res.status(201).send(horses)
    }else{
        throw new Error("Invalid Horse Format")
    }
})

//Update Horse
horsesRouter.put('/:id', getHorseById, (req, res, next)=>{    
    const index = horses.findIndex((horse)=>horse.id === req.params.id)    
    const {id, name} = req.horse
    if( index !== -1){
        horses[index] = {id:id, ...req.body}
        res.send(horses)
    }else{
        res.status(404).send('Horse Not Found')
    }
})

//Delete Horse
horsesRouter.delete('/:id', (req, res, next)=>{
    const {id} = req.params 
   
    const index = horses.map(horse=>horse.id).indexOf(id)
    console.log(index)
    if(index !== -1){
        horses.splice(index, 1)
        console.log(horses)
        res.status(204).send()
    }else{
        res.status(404).send('Horse Not Found')
    }
})

module.exports.horsesRouter = horsesRouter  