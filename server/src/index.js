import dotenv from 'dotenv';
import dbConnect from './config/db.js';
import app from './app.js';


dotenv.config();
const PORT = process.env.PORT || 3000;
dbConnect();

app.listen(PORT, (error)=>{
    if(error) console.error(error);
    console.log(`server is live at ${PORT}`);
})