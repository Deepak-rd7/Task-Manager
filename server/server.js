import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import "dotenv/config"
import dbconnect from "./config/db.js";
import taskRoute from "./routes/taskRoutes.js";
import userRoute from "./routes/userRoutes.js"
 
const app=express();

dbconnect();
const port=process.env.PORT ;


app.use(express.json());
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}))
app.use(cookieParser());



app.use('/tasks',taskRoute);
app.use('/users',userRoute);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})