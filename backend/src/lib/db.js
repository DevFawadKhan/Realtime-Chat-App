import mongoose from "mongoose";

export const DBConnect=async ()=>{
    try {
        const con =await mongoose.connect(process.env.MONGO_URI);
        console.log(`MONGO CONNECTED:${con.connection.host}`);
    } catch (error) {
        console.log("MONGO CONNECTION ERROR",error);
    }
}