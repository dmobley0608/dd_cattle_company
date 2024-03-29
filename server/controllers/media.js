const ImageKit = require("imagekit");
const path = require("path")
const { Horses } = require('../model/horses');
const { Media } = require('../model/media');
const fs = require('fs-extra')


const ik = new ImageKit({
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGE_KIT_URL
})

exports.getMediaByHorseId = async (req, res) => {
    try {
        console.log("fetching media")
        const id = Number(req.params.id)
        const media = await Media.findAll({ where: { horse_id: id } })
        res.status(200).json(media)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
    // const horses = await Horses.findAll();
    // for (let horse of horses) {
    //     const media = ik.listFiles({
    //         tags: horse.name,
    //         limit: 200
    //     }, async (err, result) => {
    //         if (result.length > 0) {

    //             for (let data of result) {
    //                 if (!Media.findAll({ where: { fileId: data.fileId } }))
    //                     await Media.create({
    //                         horse_id: horse.id,
    //                         url: data.url,
    //                         thumbnail: `https://ik.imagekit.io/7a4ad0swj/tr:n-black_thumb${data.filePath}`,
    //                         fileType: data.fileType,
    //                         fileId: data.fileId
    //                     })
    //             }
    //         }

    //     })
    // }
    // res.json("finished")

}

exports.uploadMedia = async (req, res) => {
    console.log("uploading media")    
    let { horse_id, horse_name } = req.params
    if (horse_name.split(' ').length > 1) {
        horse_name = horse_name.replace(' ', '_')
    }
    try {
        await emptyUploadsFolder()
        const results = []
        const pathUrl = path.join(__dirname, '../uploads')
        fs.readdir(pathUrl, async (err, files) => {
            if (err) throw err
            for (const file of files) {
                fs.readFile(`${pathUrl}/${file}`, async (err, data) => {
                    // ik.createFolder({folderName:horse_name, parentFolderPath:'ddc'})
                    ik.upload({
                        file: data,
                        fileName: file,
                        tags: [horse_name],
                        folder: `ddc/${horse_name}`
                    }, (err, result) => {

                        if (!err) {
                            Media.create({ horse_id: horse_id, thumbnail: result.thumbnailUrl, ...result })
                            fs.rm(`./uploads/${file}`, () => { console.log(`Removing ${file}`) })
                            results.push(result)
                        } else {
                            console.log(err)
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

const emptyUploadsFolder = async (req, res, next) => {
    console.log("deleting content from uploads folder")
    const pathUrl = path.join(__dirname, '../uploads')
    fs.readdir(pathUrl, async (err, files) => {
        if (err) throw err
        for (const file of files) {
           fs.rm(`../uploads/${file}`, () => { console.log(`Removing ${file}`) })
        }
    })
  
}

exports.removeMedia = async (req, res) => {
    try {
        console.log("removing media")
        //delete image from image kit
        console.log(req.params.fileId)
        ik.deleteFile(req.params.fileId, async function (error, result) {
            if (error) console.log(error);
            else {
                //delete image from database
                await Media.destroy({ where: { fileId: req.params.fileId } })
                    .then(x => res.status(200).json({ message: "Successfully Deleted Image" }))
            };
        });

    } catch (err) {
        res.status(500).json("Error Deleting Image")
    }

}

