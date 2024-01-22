import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectDB from "./config/db.js";

//routes 
import courseRoutes from "./routes/courseRoutes.js"
import userRoutes from "./routes/usersRoutes.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//body parser
app.use(express.json());

app.use(express.static("public"));

// Configurar CORS

app.use(cors());

dotenv.config();

//metodo conexion base de datos
conectDB();
 
//Routing
app.use("/api", courseRoutes);
app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Hola mundo");
});