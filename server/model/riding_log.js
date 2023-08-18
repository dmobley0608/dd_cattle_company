const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/sequelize");
const { Horses } = require("./horses");

exports.RidingLog = sequelize.define('RidingLog', {
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
    date:DataTypes.DATEONLY,
    notes:DataTypes.TEXT
},
    {
        tableName:'riding_log'
    }
)