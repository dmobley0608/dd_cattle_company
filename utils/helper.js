const bcrypt = require('bcryptjs');
const pool = require('./postgres');
const { Users } = require('../model/user');


exports.create = async (email, password)=>{          
    const result = await Users.create({email:email, password:password});
   if(!result) return false
    console.log('New User Create'.bgBlue)
    return result
}

exports.hashPassword=async(phrase)=>{
    const salt = bcrypt.genSaltSync(10)
    const hash = await bcrypt.hashSync(phrase, salt)
    return hash;
}

exports.compareHash=async(hash, password)=>{     
    const isMatch = await bcrypt.compareSync(password, hash)
    return isMatch;
}

exports.emailExists=async(email)=>{
    const results = await pool.query('SELECT * FROM users WHERE email=$1', [email])
    if(results.rowCount == 0) return false
    return results.rows[0]
}