exports.medicalRecordValidator=(req)=>{
    const horse_id = req.body.horse_id
    const wormed = req.body.wormed || false;
    const coggins = req.body.coggins || false;
    const rabies = req.body.rabies || false;
    const yearly_vaccines = req.body.yearly_vaccines || false;
    const notes = req.body.notes || null;
    const height = req.body.height || null;
    const weight = req.body.weigth || null;
    const veterinarian = req.body.veterinarian || null;
    const date = req.body.date || new Date().toDateString()
    const description = req.body.description || null;
    return [horse_id,wormed, coggins, rabies, yearly_vaccines, notes, height, weight, veterinarian, date, description]
}