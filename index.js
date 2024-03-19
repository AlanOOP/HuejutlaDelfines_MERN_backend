import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectDB from "./config/db.js";
import path from "path";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

//routes 
import courseRoutes from "./routes/courseRoutes.js"
import userRoutes from "./routes/usersRoutes.js"
import instructorRoutes from "./routes/instructorRoutes.js"

const app = express();

dotenv.config();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//body parser


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//habilitar carpeta publica
app.use(express.static(path.join(__dirname, "public")));

//whitelist 6Tq8lcc6R3gHADll

const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.includes(origin)) {
            // Puede consultar la API
            callback(null, true);
        } else {
            // No esta permitido
            callback(new Error("Error de Cors"));
        }
    },
};


// Configurar CORS
app.use(cors())


//metodo conexion base de datos
conectDB();

//Routing
app.use("/api", courseRoutes);
app.use("/api", userRoutes);
app.use("/api", instructorRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    // console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Hola mundo");
});