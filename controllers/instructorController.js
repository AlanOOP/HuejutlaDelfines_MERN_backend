import Instructor from "../models/Instructor.js";
import { generateToken } from "../helpers/generateToken.js";
import bcrypt from "bcrypt";

// Obtener todos los instructores

const getInstructors = async (req, res) => {
    try {
        const instructors = await Instructor.find();
        res.json(instructors);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

