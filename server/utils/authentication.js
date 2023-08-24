//Passport
const passport = require('passport');
const { compareHash } = require('./helper');
const { User } = require('../model/user');
const LocalStrategy = require("passport-local");
const GoogleStrategy = require('passport-google-oidc')
//Local Login
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

//Google Login
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/oauth/google',
    scope: ['profile', 'email']
},
async function verify(issuer, profile, cb){   
    
    let user = await User.findOne({where:{id:profile.id}})
    
    if(!user){
       user= await User.create({id:profile.id, username: profile.displayName, role:'user', email: profile.emails[0].value})        
    }       
    return cb(null, user)
}
))
passport.serializeUser(function(user, cb){
    process.nextTick(()=>{        
        cb(null, {first_name: user.first_name, role:user.role})
    })
});
passport.deserializeUser(function(user, cb){
    process.nextTick(()=>{
        cb(null, {first_name: user.first_name, role: user.role})  
    })
})


module.exports = passport