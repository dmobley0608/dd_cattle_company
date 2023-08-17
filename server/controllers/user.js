const { User } = require("../model/user")
const { hashPassword } = require("../utils/helper")
const { Session } = require("./session")

exports.login = (req, res) => {
    try{       
        res.status(200).json({username:req.user.username, role:req.user.role})
    }catch(err){
        console.log(err)
    }
      
}
exports.logout= async(req, res) => {
    try{  
        console.log("loggin out")
        await Session.destroy({where:{sid:req.sessionID}})  
        res.redirect("/login")
    }catch(err){
        console.log(err)
    }
      
}
exports.register = async (req, res)=>{
    let user = await User.findOne({where:{username:req.body.email}})
    if(user) return res.status(401).json("User Account already exists")
    const password = await hashPassword(req.body.password);
    user= User.create({username:req.body.email, password:password, role:'guest', createdAt: Date.now(), updatedAt:Date.now()})
    return res.status(200).json(user)
}