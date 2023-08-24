const express = require('express');


const multer = require('multer');
const {register, login, logout  } = require('../controllers/user');
const passport = require('../utils/authentication');



const upload = multer();
const router = express();

router.post('/register', register)
router.post('/login',upload.none(),  passport.authenticate('local'), login) 
router.get('/logout',upload.none(), logout) 



module.exports = router 