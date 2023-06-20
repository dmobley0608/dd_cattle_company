
exports.getUser=(req, res)=>{
    res.status(200).json({
        user:{
            id:req.user.id,
            email:req.user.email,
            role:req.user.role
        }
    })
}