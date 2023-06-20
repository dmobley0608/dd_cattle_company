const { DataTypes } = require("sequelize");

const { hashPassword } = require("../utils/helper");
const { sequelize } = require("./sequelize");

exports.Users = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING
    },

},
    {
        tableName: 'users',
        createdAt: false,
        updatedAt: false,
        
    },
    
    ) 