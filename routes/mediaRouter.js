const express = require('express');
const { getMediaByHorseId } = require('../controllers/media');

const router = express();

router.get('/:id', getMediaByHorseId)


module.exports = router;