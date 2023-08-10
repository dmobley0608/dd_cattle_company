//Passport
const passport = require('passport');
const { compareHash } = require('./helper');
const { User } = require('../model/user');
const LocalStrategy = require("passport-local");
passport.use(new LocalStrategy(
    {usernameField:'email'},
    async function (username, password, done) {       
        try{       
        const user =  await User.findOne({ where: { username: username }, raw: true })
        if (!user) return done(null, false)
        //Verify Password Match    
        const match =  await compareHash(user.password, password)
        console.log(match)
        if (!match) return done(null, false)
        if(match) console.log("Authentication Successful")
        //Create Token
        return done(null, user)
    } catch (err) {
        console.log(err)       
    }
    }
  ));
  passport.serializeUser(function(user, cb){
    process.nextTick(()=>{               
        cb(null, {username: user.username, role:user.role})
    })
});
passport.deserializeUser(function(user, cb){
    process.nextTick(()=>{      
        cb(null,  {username: user.username, role:user.role})  
    })
})

module.exports = passport