const express = require('express');
const { getMedicalRecordByHorseId, create, update, remove } = require('../controllers/medical_records');
const multer = require('multer');
const { auth } = require('../controllers/authentication');
const upload = multer();
const router = express.Router();

router.get('/:horse_id', getMedicalRecordByHorseId)

router.post('/', upload.none(),auth, create)

router.put('/:id',upload.none(), auth, update)

router.delete('/:id',upload.none(), auth, remove)

module.exports = router; 