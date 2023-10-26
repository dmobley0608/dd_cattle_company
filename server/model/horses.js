const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/sequelize");


exports.Horses = sequelize.define('Horses',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING
    },
    sex:{
        type:DataTypes.STRING
    },
    birth_date:{
        type:DataTypes.DATEONLY
    },
    bio:{
        type:DataTypes.TEXT
    },
    brand:{
        type:DataTypes.STRING,
        
    },
    breed:{
        type:DataTypes.STRING
    },
    color:{
        type:DataTypes.STRING
    },
    hma:{
        type:DataTypes.STRING
    },
    price:{
        type:DataTypes.DECIMAL
    },
    off_property_rides:{
        type:DataTypes.BOOLEAN
    }
   
    
},{    
        tableName: 'horses',
        createdAt: false,
        updatedAt: false,
        
        
    }

   
)
