const express = require('express')
const { addRidingLog, deleteRidingLog } = require('../controllers/riding_log')




const router = express.Router()


router.post('/:horseId', addRidingLog)

router.delete('/:id', deleteRidingLog)




module.exports = router  