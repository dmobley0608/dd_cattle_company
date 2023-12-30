const express = require('express');
const { getMediaByHorseId, uploadMedia, removeMedia, } = require('../controllers/media');
const { auth } = require('../controllers/authentication');
const router = express();
const path = require('path');

// Multer For Upload Handling
const multer = require('multer');
const storage = multer.diskStorage({
    destination: path.join(__dirname, '..','uploads'),
    filename: (req, file, cb) => {             
        cb(null, file.originalname)
    }
})

const upload = multer({storage:storage})


router.get('/:id', getMediaByHorseId)

router.post('/:horse_id/:horse_name', upload.array('media'), auth,uploadMedia)

router.delete('/:fileId',auth, removeMedia) 

module.exports = router;

