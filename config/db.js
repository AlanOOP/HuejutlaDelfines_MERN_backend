//conexion a mongoDB
import mongoose from "mongoose";

const conectDB = async () => {
    try {
        // const conn = await mongoose.connect(process.env.MONGO_URI);
        const conn = await mongoose.connect('mongodb+srv://root:6Tq8lcc6R3gHADll@cluster0.xb2m3w4.mongodb.net/HuejutlaDB?retryWrites=true&w=majority')
        const url = ` ${conn.connection.host} : ${conn.connection.port} `;
        // console.log(`MongoDB connected: ${url} ✅`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default conectDB;