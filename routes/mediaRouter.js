const express = require('express');
const { getMediaByHorseId, uploadMedia, removeMedia } = require('../controllers/media');

const router = express();

//Multer For Upload Handling
const multer = require('multer');
const { auth } = require('../controllers/authentication');



const upload = multer({dest:'uploads/'})

router.get('/:id',auth, getMediaByHorseId)

router.post('/:horse_id/:horse_name', upload.array('media', 12), uploadMedia)

router.delete('/:asset_id', removeMedia) 

module.exports = router;

