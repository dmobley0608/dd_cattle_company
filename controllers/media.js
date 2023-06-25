


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

        const media = await Media.findAll({ where: { horse_id: id }, include: { model: Horses, required: true }, })
        return res.status(200).json(media)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

exports.uploadMedia = async (req, res) => {
    const { horse_id, horse_name } = req.params
    try {

        for (let media of req.files) {
            await cloudinary.uploader.upload(media.path, { public_id: `double_d_ranch/${horse_name}/${media.filename}` })
                .then(async (res) => {
                    await Media.create({ ...res, horse_id: horse_id })
                })
        }
        const fs = require('fs-extra')
        fs.readdir('./uploads', (err, files)=>{
            if(err) return res.send(err)
            for(const file of files){
                fs.rm(`./uploads/${file}`, ()=>{console.log(`Removing ${file}`)})
            }
        })
       
        res.status(200).send("Media Uploaded Successfully")

    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message }) 
    }
}

exports.removeMedia = async (req, res) => {
    const asset_id = req.params.asset_id
    try {
        const media = await Media.findOne({ where: { asset_id: asset_id }, raw: true })
        await cloudinary.uploader.destroy(media.public_id).then(async (res) => {
            await Media.destroy({ where: { public_id: media.public_id } })
        })
        res.status(203).send("Successfully Removed Media")
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

