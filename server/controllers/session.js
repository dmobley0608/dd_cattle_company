const { DataTypes } = require("sequelize")
const { sequelize } = require("../utils/sequelize")

exports.Session = sequelize.define("Session", {
    sid: {
        type: DataTypes.STRING,
        primaryKey: true,
       defaultValue: DataTypes.UUIDV4
    },
   sess: {
        type: DataTypes.JSON,        
    },
    expire: {
        type: DataTypes.DATE,    
        
    },
    createdAt:{
        type:DataTypes.DATE,
        defaultValue:Date.now()
    }
  
}, {
    tableName: 'session',        
    updatedAt: false, 
});

