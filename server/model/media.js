const { DataTypes } = require("sequelize");


const { sequelize } = require("../utils/sequelize");
const { Horses } = require("./horses");

exports.Media = sequelize.define('Media', {
    fileId: {
        type: DataTypes.STRING,
        primaryKey: true,       
    },
    horse_id:{
        type:DataTypes.INTEGER,
        references:{
            model:Horses,
            key:"id"
        }
    },
    url: {
        type: DataTypes.STRING
    },
    thumbnail: {
        type: DataTypes.STRING
    },
    fileType: {
        type: DataTypes.STRING    
    },  
    
   
   
   
    


},
    {
        tableName: 'media',
        createdAt: false,
        updatedAt: false,
      

    },   
    
) 

