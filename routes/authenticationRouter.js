const express = require('express');
const passport = require('passport');
require('../model/passportConfig')(passport)
const multer = require('multer');
const { getUser } = require('../controllers/authentication');
const upload = multer();
const router = express();

router.post('/register', passport.authenticate("local-signup", {session:true}), getUser)
router.post('/login', passport.authenticate('local-login'), getUser)
module.exports = router