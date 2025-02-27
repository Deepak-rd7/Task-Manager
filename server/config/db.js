import mongoose from "mongoose";


async function dbconnect(){
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connected");
    } catch (error) {
        console.log("DB connection error");
        
    }
}

export default dbconnect;