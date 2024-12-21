
const app = require('./app.js');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//dotenv config

dotenv.config();
//mongodb connection
connectDB(process.env.MONGO_URL)

//port

const port = process.env.PORT || 8050

//listen port

app.listen(port, () =>{
    console.log(`Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}` 
        
        
    );
})




