const LocalStrategy = require("passport-local");
const { create, emailExists, compareHash } = require("../utils/helper");




module.exports=(passport)=>{    
    passport.use(
        'local-signup', 
        new LocalStrategy({usernameField:'email', passwordField:'password'},
        async(email, password, done)=>{
            try{
                //Check for existing user
                const userExists = await emailExists(email);
                //Return if user is found
                if(userExists)return done(null, false)
                //Create user
                const user = await create(email, password)
                //Return user
                return done(null, {id:user.id, email:user.email, role:user.role})
            }catch(err){
                return done(err)
            }
        }));
    passport.use("local-login",
    new LocalStrategy({usernameField:'email', passwordField:'password'},
    async (email, password, done)=>{
        try{
            //Check for user
            const user = await emailExists(email)           
            if(!user) return done(null, false)
            //Verify Password
            const isMatch = await compareHash(user.password, password)           
            if(!isMatch) return done(null, false)
            //Return user if Verified
            return done(null, {id:user.id, email:user.email, role:user.role})
        }catch(err){
            done(err, false)
        }
    }))

    passport.serializeUser((user, done) => {
        process.nextTick(()=>{done(null, {id:user.id, email:user.email, role:user.role})})
    })
    passport.deserializeUser((id, cb) => {
        pool.query('SELECT id, email, role FROM users WHERE id =$1', [id], (err, result) => {
            if (err) {
                cb(err)
            }
            cb(null, result.rows[0])
        })
    })
}