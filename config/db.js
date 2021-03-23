const mongoose = require("mongoose")
const config = require('config')

const db = config.get('mongoURI')

const connectDB = async () =>{
    try{
        const DB_USER = 'devconnector';
        const PASSWORD = encodeURIComponent('104785Aa@'); 
        const DB_URL = `mongodb://${DB_USER}:${PASSWORD}@devconnector-shard-00-00.dusox.mongodb.net:27017,devconnector-shard-00-01.dusox.mongodb.net:27017,devconnector-shard-00-02.dusox.mongodb.net:27017/devconnector?ssl=true&replicaSet=atlas-xn4vbg-shard-0&authSource=admin&retryWrites=true&w=majority`;
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify:false
        })
        console.log('MongoDB connected..')
    }catch(err){
        console.log(err.message)
        // exit the failed process
        process.exit(1)
    }
}

module.exports = connectDB