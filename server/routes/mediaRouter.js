const express = require('express');
const { getMediaByHorseId, uploadMedia, removeMedia } = require('../controllers/media');
const { auth } = require('../controllers/authentication');
const router = express();

//Multer For Upload Handling
const multer = require('multer');




const upload = multer({dest:'uploads/'})

router.get('/:id', getMediaByHorseId)

router.post('/:horse_id/:horse_name', upload.array('media'), auth,uploadMedia)

router.delete('/:fileId',auth, removeMedia) 

module.exports = router;

