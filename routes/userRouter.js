const express = require('express');
const passport = require('passport');
require('../model/passportConfig')(passport)
const multer = require('multer');
const { getUser, register, login } = require('../controllers/user');
const upload = multer();
const router = express();

router.post('/register',register)
router.post('/login',login) 
module.exports = router