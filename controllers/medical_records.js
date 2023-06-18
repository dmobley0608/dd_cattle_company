const pool = require('../model/postgres')
const { medicalRecordValidator } = require('../utils/validators')

//READ 
exports.read = (req, res) => res.json(req.medical_records)

//GET RECORDS BY ID
exports.getMedicalRecordByHorseId = async (req, res, next) => {
    const id = Number(req.params.horse_id)   
    try { 
        // GET RECORDS
        const records = await pool.query('SELECT * FROM medical_records WHERE horse_id = $1', [id])
        pool.end()
        req.medical_records = records.rows;
        return next();
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
        const newRecord = await pool.query('INSERT INTO medical_records ' +
            '(horse_id, wormed, coggins, rabies, yearly_vaccines, notes, height, weight, veterinarian, date, description)' +
            'VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', medicalRecordValidator(req))
        pool.end();
        return res.status(201).send(`New Record Added: ${newRecord.rows}`)

    } catch (err) {
        return res.status(400).json({ error: err.message })
    }

}

//UPDATE RECORD
exports.update=async(req, res)=>{
    console.log(req.params.id)
    const recordId = Number(req.params.id);
    try{
        await pool.query('UPDATE medical_records SET horse_id=$1, wormed = $2, coggins=$3, rabies=$4, yearly_vaccines=$5, notes=$6,'+
        ' height=$7, weight=$8, veterinarian=$9, date=$10, description=$11 WHERE id = $12',[...medicalRecordValidator(req), recordId])
        return res.status(200).send("Record Updated")
    }catch(err){
        return res.status(400).json({error:err.message})
    }
}

//DELETE RECORD
exports.remove=async(req,res)=>{
    const id = Number(req.params.id)
    try{
        await pool.query('DELETE FROM medical_records WHERE id= $1', [id])
        return res.status(200).send('Record Deleted Sucessfully')
    }catch(err){
        return res.status(400).json({error:err.message})
    }
}