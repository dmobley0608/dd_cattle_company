const express = require('express')
const { getAllHorses, getHorseById, updateHorseById, createHorse, removeHorse, getHorseByName } = require('../controllers/horse');
const { auth } = require('../controllers/authentication');


const router = express.Router()

//Get all Horses
router.get('/',  getAllHorses) 

//Get Horse By Id
// router.get('/:id', getHorseById)
//Get Horse By Name
router.get('/:name', getHorseByName)

//Add Horse
router.post('/', auth, createHorse)

//Update Horse
router.put('/:id', auth,updateHorseById)

//Delete Horse
router.delete('/:id',auth, removeHorse)


module.exports = router  