const express = require('express');
const { pool } = require('../utils/postgres');
const { getMedicalRecordByHorseId, read, create, update, remove } = require('../controllers/medical_records');
const multer = require('multer')
const upload = multer();
const router = express.Router();

router.get('/:horse_id', getMedicalRecordByHorseId, read)

router.post('/', upload.none(),create)

router.put('/:id',upload.none(), update)

router.delete('/:id', remove)

module.exports = router; 