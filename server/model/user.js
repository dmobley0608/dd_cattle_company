const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/sequelize");

exports.User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
   
    username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    role: {
        type: DataTypes.TEXT
    },
    first_name: DataTypes.TEXT, 
    last_name: DataTypes.TEXT  
 

},
    {
        tableName: 'users',   
                    
        
    },
    
    ) 