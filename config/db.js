const mongoose = require("mongoose")
const config = require('config')

const db = config.get('mongoURI')

const connectDB = async () =>{
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify:false
        })
        console.log('MongoDB connected..')
    }catch{
        console.error(err.message)
        // exit the failed process
        process.exit(1)
    }
}

module.exports = connectDB