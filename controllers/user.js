const { Users } = require("../model/user")
const { hashPassword, compareHash } = require("../utils/helper")

exports.register = async(req, res)=>{

    try{
    const {email, password} = req.body
    const hashedPassword = await hashPassword(password)
    const result = await Users.create({email:email, password:hashedPassword})
    res.status(200).json(result)
    }catch(err){
        res.status(500).json(err.message)
    }
}

exports.login = async(req, res)=>{
    try{
        const {email, password} = req.body
        const user = await Users.findOne({where:{email:email}})
        //Check for user
        if(!user) return res.status(404).json('User Not Found')
        //Verify Password
        const match = await compareHash(user.password, password)
        if(!match) return res.status(403).json('Invalid Username or Password')    
        const session = req.session
        session.role = user.role
        res.status(200).json({email:user.email, role:user.role})

    }catch(err){
        res.status(500).json(err.message)
    }
}