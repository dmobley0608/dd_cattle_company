const bcrypt = require('bcryptjs');
const pool = require('../model/postgres');


exports.create = async (email, password)=>{   
    const hashPassword = await this.hashPassword(password);    
    const result = await pool.query('INSERT INTO USERS (email,password) VALUES($1,$2) RETURNING id, email, password, role', [email, hashPassword]);
    if(result.rowCount == 0) return false;
    console.log('New User Create'.bgBlue)
    return result.rows[0]
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