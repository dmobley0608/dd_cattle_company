const express = require('express')

const horsesRouter = express.Router()
//TEMP DATA
const horses = [{id:'1', name:"Dancer"}, {id:'2', name:'Titus'}, {id:'3', name:'Henry'}]

//Middleware
horsesRouter.param ('id', (req, res, next, id)=>{
    console.log('fetching horse')
    let horseId = id   
    index = horses.findIndex(horse=> horse.id === horseId)  
    if(index !== -1){       
        req.horseIndex = index
        
        next();
    }else{
        let error = new Error("Horse Not Found")
        error.status = 404
        error.message = "Horse Not Found"
       next(error)
    }
    
});



//Get all Horses
horsesRouter.get('/', (req, res,next)=>{
    res.send(horses)
}) 

//Get Horse By Id
horsesRouter.get('/:id', (req, res, next)=>{   
        console.log('sending horse')
        res.send(horses[req.horseIndex])  
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
horsesRouter.put('/:id', (req, res, next)=>{            
        horses[req.horseIndex] = {id:horses[req.horseIndex].id, ...req.body}
        res.send(horses)    
})

//Delete Horse
horsesRouter.delete('/:id', (req, res, next)=>{    
        horses.splice(req.horseIndex, 1)       
        res.status(204).send()   
})


module.exports.horsesRouter = horsesRouter  