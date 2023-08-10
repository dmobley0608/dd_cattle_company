
exports.auth = (req, res, next) => {
    try {
        const user = req.user
       
        if (!user) return res.status(401).json('access denied')

       if(user.role === 'admin'){
        next()
       }else{
        return res.status(403).json('Must be logged in as administrator')
       }
        
       
    } catch (err) {
        res.status(500).json(err.message)
    }
}
