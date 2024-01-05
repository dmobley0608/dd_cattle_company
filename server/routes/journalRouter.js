const express = require('express')
const { addRidingLog, deleteRidingLog, editRidingLog } = require('../controllers/riding_log')




const router = express.Router()


router.post('/:horseId', addRidingLog)
router.put('/:id', editRidingLog)
router.delete('/:id', deleteRidingLog)




module.exports = router  