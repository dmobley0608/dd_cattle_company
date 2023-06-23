const { Horses } = require("../model/horses")
const { Media } = require("../model/media")
const { MedicalRecord } = require("../model/medical_record")


exports.getAllHorses = async(req, res)=>{
    try{
        Horses.hasMany(Media, {
            foreignKey:'horse_id'
        })
        Horses.hasMany(MedicalRecord, {
            foreignKey:'horse_id'
        })
        const horses = await Horses.findAll({order:[['name', 'ASC']], include:[Media, MedicalRecord]})
        
        return res.status(200).json(horses)
    }catch(err){
        res.status(500).json(err.message)
    }
   
}

exports.getHorseById = async(req, res)=>{
    try{
        const id = Number(req.params.id)        
        const horse = await Horses.findByPk(id)
        if(!horse)return res.status(404).json('Horse not found')
        res.status(200).send(horse)

    }catch(err){
        if(typeof(id) !== 'number') return res.status(400).json('Invalid Id Type')
        res.status(500).json(err.message)
    }
}

exports.updateHorseById = async(req,res)=>{
  
    try{
         
        await Horses.update({...req.body},{where:{id:req.params.id}})
        res.status(200).json("Update successful")

    }catch(err){
        res.status(500).send(err.message)
    }
}

exports.createHorse = async(req, res)=>{
    try{
        const horse =await Horses.create({...req.body});
        res.status(200).json(horse)
    }catch(err){
        res.status(500).json(err.message)
    }
}

exports.removeHorse = async(req, res)=>{
    try{
        await Horses.destroy({where:{id:req.params.id}})
        res.status(200).json('Horse sucessfully removed.')
    }catch(err){
        res.status(500).json(err.message)
    }
}