const express = require('express');
const passport = require('passport');

const multer = require('multer');
const { getUser, register, login } = require('../controllers/user');
const upload = multer();
const router = express();

router.post('/register',register)
router.post('/login',passport.authenticate('local' ), login) 


module.exports = router