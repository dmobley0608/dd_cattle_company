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
        const media = await pool.query('SELECT media.*, horses.name FROM media JOIN horses ON media.horse_id=horses.id WHERE horse_id = $1', [id])
        return res.status(200).json(media.rows)
    } catch (err) {        
        res.status(400).json({ error: err.message })
    }
}

exports.uploadMedia = async (req, res) => {
    const {horse_id,horse_name} = req.params
    try {        
        for (let media of req.files) {
            await cloudinary.uploader.upload(media.path, { public_id: `double_d_ranch/${horse_name}/${media.originalname}` })
                .then(async (res) => {
                    await pool.query('INSERT INTO media (horse_id, format, public_id, asset_id) VALUES($1, $2, $3, $4);', [horse_id, res.format, res.public_id, res.asset_id])
                })
        }
        res.status(200).send("Media Uploaded Successfully")

    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message })
    }
}

exports.removeMedia = async (req, res) => {
    const asset_id = req.params.asset_id
    try {
        const image = await pool.query('SELECT * FROM media WHERE asset_id = $1', [asset_id])
        const public_id = image.rows[0].public_id
        console.log(public_id)

        await cloudinary.uploader.destroy(public_id).then(async (res) => {
            pool.query('DELETE FROM media WHERE public_id = $1;', [public_id])
        })
        res.status(203).send("Successfully Removed Media")
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}
// asset_id: 'df4ec0f559facfb3361b4eabaf84604a',
// public_id: 'double_d_ranch/Titus/20230423_141705.jpg',
// version: 1687173454,
// version_id: 'f5ebe2cf5eea9ff0c29723cc0d4ddac2',
// signature: '77923c6acb2edd93c68b551bb26bd5323c0b3671',
// width: 2992,
// height: 2992,
// format: 'jpg',
// resource_type: 'image',
// created_at: '2023-06-19T11:17:34Z',
// tags: [],
