
const LocalStrategy = require('passport-local')
const { Users } = require('../model/user')
const { compareHash } = require('./helper')


exports.passportConfig = (passport) => {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async function (email, password, cb) {
        const user = await Users.findOne({ where: { email: email } })
        if (!user) return cb(null, false)
        const match = compareHash(password, user.password)
        if (!match) return cb(null, false)
        const result = user.get()
        return cb(null, { email: result.email, role: result.role })
    }))

    passport.serializeUser(function (user, done) {
        console.log('serialize user')
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
}
