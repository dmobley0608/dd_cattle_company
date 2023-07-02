
const { MedicalRecord } = require('../model/medical_record')
const { medicalRecordValidator } = require('../utils/validators')




//GET RECORDS BY ID
exports.getMedicalRecordByHorseId = async (req, res, next) => {
    const id = Number(req.params.horse_id)   
    try { 
        // GET RECORDS
        const records = await MedicalRecord.findAll({where:{horse_id:id}, order:['id', 'DESC']})       
        return res.status(200).json(records)
    } catch (err) {
         //CHECK FOR VALID ID FORMAT
    if (err.message === 'invalid input syntax for type integer: "NaN"') {
       err.message = "Horse Id must be a number"       
    }
        return res.status(400).json({ error:err.message });
    }
}

//ADD NEW RECORD
exports.create = async (req, res,) => {  
    
    try {
        const newRecord = await MedicalRecord.create({...req.body})
        
        return res.status(201).json(newRecord)

    } catch (err) {
        console.log(err)
        return res.status(400).json({ error: err.message })
    }

}

//UPDATE RECORD
exports.update=async(req, res)=>{
    console.log(req.params.id)
    const recordId = Number(req.params.id);
    try{
        await MedicalRecord.update({...req.body}, {where:{id:recordId}})
        return res.status(200).send("Record Updated")
    }catch(err){
        return res.status(400).json({error:err.message})
    }
}

//DELETE RECORD
exports.remove=async(req,res)=>{
    const id = Number(req.params.id)
    try{
        await MedicalRecord.destroy({where:{id:id}})
        return res.status(200).send('Record Deleted Sucessfully')
    }catch(err){
        return res.status(400).json({error:err.message})
    }
}