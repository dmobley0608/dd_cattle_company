const express = require('express')
const { getHorses } = require('../model/postgres')
const { pool } = require('../model/postgres')
const { SelectHorses } = require('../model/postgres')
const { SelectHorseByID } = require('../model/postgres')
const { getAllHorses } = require('../controllers/horse')

const router = express.Router()

//Middleware
router.param ('id', async(req, res, next, id)=>{
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
router.get('/', getAllHorses) 

//Get Horse By Id
router.get('/:id', (req, res, next)=>{       
        res.status(200).json(req.horse);
})

//Add Horse
router.post('/', (req, res,next)=>{
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
router.put('/:id', (req, res, next)=>{            
        horses[req.horseIndex] = {id:horses[req.horseIndex].id, ...req.body}
        res.send(horses)    
})

//Delete Horse
router.delete('/:id', (req, res, next)=>{    
        horses.splice(req.horseIndex, 1)       
        res.status(204).send()   
})


module.exports = router  