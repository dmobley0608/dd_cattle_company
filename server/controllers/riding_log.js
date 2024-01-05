
const { RidingLog } = require('../model/riding_log');



exports.addRidingLog = async(req, res)=>{   
    if(req.user){
        const {horseId} = req.params
        const {notes, date} = req.body
        try{
            const record = await RidingLog.create({
                horse_id:horseId,
                notes:notes,
                date:date,
                author:req.user.username
            })
            res.status(200).json(record)
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("You must be logged in to add a riding record!")
    }
}

exports.editRidingLog = async(req, res)=>{    
    try{
        if(req.user){
        const record = await RidingLog.findByPk(req.params.id)
        if(!record) return res.status(404).json("record not found")
        if(record.author === req.user.username || req.user.role === 'admin'){           
            await RidingLog.update({...record, notes:req.body.notes}, {where:{id:req.params.id}})
            res.status(200).json("Record updated successfully")
        }else{
            res.status(403).json("You do not have permission to edit this record")
        }
    }else{
        res.status(403).json("You must be the record owner or an admin to edit this record.")
    }
    }catch(err){
        res.status(500).json(err.message)
    }
}

exports.deleteRidingLog = async(req, res)=>{    
    try{
        if(req.user){
        const record = await RidingLog.findByPk(req.params.id)
        if(!record) return res.status(404).json("record not found")
        if(record.author === req.user.username || req.user.role === 'admin'){
            await record.destroy();
            res.status(200).json("Record successfully deleted")
        }else{
            res.status(403).json("You do not have permission to delete this record")
        }
    }else{
        res.status(403).json("You must be logged in to proceed.")
    }
    }catch(err){
        res.status(500).json(err.message)
    }
}


