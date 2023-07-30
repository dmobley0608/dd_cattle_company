const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/sequelize");
const { Horses } = require("./horses");

exports.MedicalRecord = sequelize.define('MedicalRecord', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    horse_id:{
        type:DataTypes.INTEGER,
        references:{
            model:Horses,
            key:"id"
        }
    },
    wormed:DataTypes.BOOLEAN,
    coggins:DataTypes.BOOLEAN,
    rabies:DataTypes.BOOLEAN,
    yearly_vaccines:DataTypes.BOOLEAN,
    notes:DataTypes.TEXT,
    height:{
        type:DataTypes.DOUBLE,
        allowNull:true   
    },
    weight:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    veterinarian:DataTypes.TEXT,
    date:DataTypes.DATEONLY,
    description:DataTypes.TEXT
},
{
    tableName:'medical_records',
    createdAt:false,
    updatedAt:false
}
)