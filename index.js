import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectDB from "./config/db.js";
import path from "path";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

//routes 
import courseRoutes from "./routes/courseRoutes.js";
import userRoutes from "./routes/usersRoutes.js";
import instructorRoutes from "./routes/instructorRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js"
import secretQuestionRoutes from "./routes/secretQuestionRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import studentEvaluationRoutes from "./routes/studentEvaluationRoutes.js";
import monthlyPaymentsRoutes from "./routes/monthlyPaymentRoutes.js";
import membershipRoutes from "./routes/membershipRoutes.js";
import scheduleRoutes from './routes/scheduleRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import newsRouter from './routes/newsRoutes.js'
import datasetRoutes from './routes/datasetRoutes.js'


const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//body parser

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//habilitar carpeta publica
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "uploads")));

//whitelist 6Tq8lcc6R3gHADll

// const whitelist = [process.env.FRONTEND_URL];

// const corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.includes(origin)) {
//             // Puede consultar la API
//             callback(null, true);
//         } else {
//             // No esta permitido
//             callback(new Error("Error de Cors"));
//         }
//     },
// };


// Configurar CORS
app.use(cors());

//metodo conexion base de datos
conectDB();

app.get("/", (req, res) => {
    res.send("Hola mundo");
});

//Routing
app.use("/api", courseRoutes);
app.use("/api", userRoutes);
app.use("/api", instructorRoutes);
app.use("/api", studentRoutes);
app.use("/api", enrollmentRoutes);
app.use("/api", secretQuestionRoutes);
app.use("/api", orderRoutes);
app.use("/api", studentEvaluationRoutes);
app.use("/api", monthlyPaymentsRoutes);
app.use("/api", membershipRoutes);
app.use("/api", scheduleRoutes);
app.use("/api", notificationRoutes);
app.use("/api", newsRouter);
app.use("/api", datasetRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
