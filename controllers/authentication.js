const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (!token) return res.status(401).json('access denied')

        jwt.verify(token, process.env.SESSION_SECRET, (err, user) => {
           if(err) return res.sendStatus(403)
           if(user.role !== 'admin') return res.sendStatus(403)
           next()
        })
        
       
    } catch (err) {
        res.status(500).json(err.message)
    }
}
