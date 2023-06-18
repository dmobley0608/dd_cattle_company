const pool = require('../model/postgres');

const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

exports.getMediaByHorseId = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const media = await pool.query('SELECT * FROM media WHERE horse_id = $1', [id])
        return res.status(200).json(media.rows)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

