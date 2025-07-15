import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import router from './routes/userRoutes.js';
import cors from 'cors';

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); 
app.use(cors({
  origin: 'http://localhost:5173', // or your frontend origin
  credentials: true // allow cookies (for token)
}));
//create user routes here only

//routes 
app.use('/routes', router);

export default app;