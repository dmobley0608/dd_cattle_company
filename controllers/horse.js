const pool = require("../model/postgres")

exports.getAllHorses = async(req, res)=>{
    const horses = await pool.query('SELECT * FROM horses;')
    return res.status(200).json(horses.rows)
}