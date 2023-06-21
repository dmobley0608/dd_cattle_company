const { DataTypes } = require("sequelize");


const { sequelize } = require("./sequelize");
const { Horses } = require("./horses");

exports.Media = sequelize.define('Media', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    horse_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model:Horses,
            key:'id'
        }
    },
    format: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    public_id: {
        type: DataTypes.STRING
    },
    asset_id: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.VIRTUAL,
        get() {
            let type;
            if (this.format === 'mp4') {
                type = 'video'
            }
            type = 'image'
            return `https://res.cloudinary.com/dmobley0608/${type}/upload/${this.public_id}`
        }
    },
    thumb: {
        type: DataTypes.VIRTUAL,
        get() {
            let type;
            if (this.format === 'mp4') {
                type = 'video'
            }
            type = 'image'
            return `https://res.cloudinary.com/dmobley0608/${type}/upload/w_200/${this.public_id}`
        }
    }

},
    {
        tableName: 'media',
        createdAt: false,
        updatedAt: false,

    },

) 