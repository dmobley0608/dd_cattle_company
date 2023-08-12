const { Users } = require("../model/user")
const { hashPassword, compareHash } = require("../utils/helper")
const jwt = require('jsonwebtoken')
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body
        const hashedPassword = await hashPassword(password)
        const result = await Users.create({ email: email, password: hashedPassword })

        //Create Token
        const payload = { email: user[0].email, role: user[0].role }
        const token = jwt.sign(payload, process.env.SESSION_SECRET)
        res.status(200).json({ email: user[0].email, role: user[0].role, token: `Bearer ${token}` })
    } catch (err) {
        res.status(500).json(err.message)
    }
    return res.json(err)
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //Verify Active User
        const user = await Users.findAll({ where: { email: email }, raw: true })

        if (!user) return res.status(404).json("user not found")
        //Verify Password Match    
        const match = await compareHash(user[0].password, password)

        if (!match) return res.status(403).json("access denied")
        //Create Token
        const payload = { email: user[0].email, role: user[0].role }
        const token = jwt.sign(payload, process.env.SESSION_SECRET, {expiresIn:".5h"})
        res.status(200).json({ email: user[0].email, role: user[0].role, token: `Bearer ${token}` })
    } catch (err) {
        console.log(err)
        res.status(500).json(err.message)
    }
}