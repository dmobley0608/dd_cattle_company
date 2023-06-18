const express = require('express');
const { pool } = require('../model/postgres');
const { getMedicalRecordByHorseId, read, create, update, remove } = require('../controllers/medical_records');

const router = express.Router();

router.get('/:horse_id', getMedicalRecordByHorseId, read)

router.post('/', create)

router.put('/:id', update)

router.delete('/:id', remove)

module.exports = router; 