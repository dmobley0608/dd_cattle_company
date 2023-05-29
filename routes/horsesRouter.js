const express = require('express')

const horsesRouter = express.Router()
//TEMP DATA
const horses = [{id:'1', name:"Dancer"}, {id:'2', name:'Titus'}, {id:'3', name:'Henry'}]

//Get all Horses
horsesRouter.get('/', (req, res,next)=>{
    res.send(horses)
}) 

//Get Horse By Id
horsesRouter.get('/:id', (req, res, next)=>{
    const {id} = req.params
    const horse = horses.filter(horse=>horse.id === id)
    if(horse){
        res.send(horse)
    }else{
        res.status(404).send('Horse Not Found')
    }
})

//Add Horse
horsesRouter.post('/', (req, res,next)=>{
    const {name, id} = req.query  
    const horse = {id, name} 
    if(horse.name){
        horses.push(horse)
        res.status(201).send(horses)
    }else{
        res.status(400).send()
    }
})

//Update Horse
horsesRouter.put('/:id', (req, res, next)=>{
    const {id} = req.params
    const {name} = req.query   
    const index = horses.map(horse=>horse.id).indexOf(id)   
    if( index !== -1){
        horses[index] = {id, name}
        res.send(horses)
    }else{
        res.status(404).send('Horse Not Found')
    }
})

//Delete Horse
horsesRouter.delete('/:id', (req, res, next)=>{
    const {id} = req.params 
    console.log(id) 
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