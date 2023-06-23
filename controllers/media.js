


const { Horses } = require('../model/horses');
const { Media } = require('../model/media');

const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET 
})

exports.getMediaByHorseId = async (req, res) => {  
    try {
        const id = Number(req.params.id)        
        Horses.hasMany(Media, {
            foreignKey: 'horse_id'
        })
       
        const media = await Media.findAll({where:{horse_id: id}, include:{model:Horses, required:true}, })
        return res.status(200).json(media)
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

