
exports.getUser=(req, res)=>{
    res.status(200).json({
        user:{
            id:req.user.id,
            email:req.user.email,
            role:req.user.role
        }
    })
}

exports.auth = (req, res, next)=>{
    if(!req.user){
        return res.status(403).send('access denied')    
    }
    if(req.user.role === 'user'){
        return res.status(403).send('access denied')  
    }
    next()
}
