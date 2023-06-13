const express = require('express')
const { getHorses } = require('../provider/postgres')
const { pool } = require('../provider/postgres')
const { SelectHorses } = require('../provider/postgres')
const { SelectHorseByID } = require('../provider/postgres')

const horsesRouter = express.Router()

//Middleware
horsesRouter.param ('id', async(req, res, next, id)=>{
    console.log('Rounding up horse by id')
    let horseId = id   
    await pool.query(SelectHorseByID, [horseId], (error, results)=>{
        if(results.rows.length < 1){
            let error = new Error();
            error.status = 404
            error.message = "Horse Not Found"
           next(error)
        
        }else if(error){
            next(error);
        }else{
            req.horse = results.rows[0];            
            next();
        }
    })        
            
});



//Get all Horses
horsesRouter.get('/', async(req, res,next)=>{
  pool.query(SelectHorses, (error, results)=>{
    if(error){throw error}
    res.status(200).json(results.rows)
  })
}) 

//Get Horse By Id
horsesRouter.get('/:id', (req, res, next)=>{       
        res.status(200).json(req.horse);
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