const {Sequelize} = require('sequelize')

exports.sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,{
    host:process.env.DB_HOST,
    dialect:'postgres'
    
})

exports.sequelizeSync=async()=>{
    console.log('Connecting To DB'.blue)
    console.log('Syncing DB'.blue)
    this.sequelize.sync({alter:true, logging:false})
    console.log('DB Successfully Connected and Synced'.blue)
}