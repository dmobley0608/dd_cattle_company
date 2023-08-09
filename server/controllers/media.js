const ImageKit = require("imagekit");
const path = require("path")

const { Horses } = require('../model/horses');
const { Media } = require('../model/media');

const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})





const ik = new ImageKit({
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGE_KIT_URL
})

exports.getMediaByHorseId = async (req, res) => {
    try {
        const id = Number(req.params.id)
        Horses.hasMany(Media, {
            foreignKey: 'horse_id'
        })
        const media = Media.findAll({ where: { horse_id: id } })
        return res.status(200).json(media)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
    // const horses = await Horses.findAll();
    
    // for(let horse of horses){
    //     const media = ik.listFiles({
    //         tags:horse.name
    //     },async(err, result)=>{
    //         if(result.length > 0){
    //             for(let data of result){
    //             await Media.create({horse_id:horse.id, thumbnail:data.thumbnailUrl, ...data}) 
    //             }
    //         }
           
    //     })
    // }
    res.json("finished")
}

exports.uploadMedia = async (req, res) => {
    const { horse_id, horse_name } = req.params
    try {

        // for (let media of req.files) {
        //     await cloudinary.uploader.upload(media.path, { public_id: `double_d_ranch/${horse_name}/${media.filename}` })
        //         .then(async (res) => {
        //             await Media.create({ ...res, horse_id: horse_id })
        //         })
        // }
        const fs = require('fs-extra')
        const results = []
        const pathUrl = path.join(__dirname, '../uploads')
        fs.readdir('./uploads', async (err, files) => {
            if (err) return res.send(err)
            for (const file of files) {
                console.log(file)
                fs.readFile(`${pathUrl}/${file}`, async(err, data)=>{
                    ik.upload({
                        file: data,
                        fileName: file,
                        tags: [horse_name],
                        folder:`ddc/${horse_name}`
                    }, (err, result) => {
                        console.log(err)
                        console.log(result)
                        if (!err) {
                            Media.create({horse_id:horse_id,thumbnail:result.thumbnailUrl, ...result})
                            fs.rm(`./uploads/${file}`, () => { console.log(`Removing ${file}`) })
                            results.push(result)
                        }
                    })
                })
              

            }
        })

        res.status(200).send(results)

    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message })
    }
}

exports.removeMedia = async (req, res) => {
    try{
        //delete image from image kit
        ik.deleteFile(req.params.fileId, async function(error, result) {
            if(error) console.log(error);
            else {
                //delete image from database
                await Media.destroy({where:{fileId:req.params.fileId}})
            };
        });
        res.status(200).json("Successfully Deleted Image")
    }catch(err){
        res.status(500).json("Error Deleting Image")
    }
    
}

