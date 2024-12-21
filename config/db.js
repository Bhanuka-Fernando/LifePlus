const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async (dburl) => {

    try{
        const connection = await mongoose.connect(dburl);
        console.log("DBURL",dburl)
        console.log(`Mongodb Connected ${mongoose.connection.host}`.bgGreen);
        return connection;
    
    }catch(error){
        console.log(`Mongodb Server Issue ${error}`.bgRed);
        throw error;
    }
    // try {
    //     await mongoose.connect(process.env.MONGO_URL);
    //     console.log(`Mongodb Connected ${mongoose.connection.host}`.bgGreen.white);
    // } catch (error) {
    //     console.log(`Mongodb Server Issue ${error}`.bgRed.white);
    // }
}
module.exports = connectDB;