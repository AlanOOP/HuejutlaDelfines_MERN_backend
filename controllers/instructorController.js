import Instructor from "../models/Instructor.js";
import Courses from "../models/Courses.js";
import { generateToken } from "../helpers/generateToken.js";
import bcrypt from "bcrypt";
import Users from "../models/Users.js";

// Obtener todos los instructores

const getInstructors = async (req, res) => {
    try {
        const instructors = await Instructor.find().populate('user');
        res.json(instructors);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// Agregar un instructor

const addInstructor = async (req, res) => {
    try {
        const { name, lastName, password, email, phone, age, speciality } = req.body;

        if (!name || !password || !email || !phone || !age || !lastName) {
            const error = new Error('Campos Requeridos');
            return res.status(400).json(error.message);
        }

        //Comprobar si el usuario existe 
        const userExist = await Users.findOne({
            email
        });

        if (userExist) {
            const error = new Error('El usuario ya existe');
            return res.status(400).json(error.message);
        }

        const user = new Users({
            password,
            email,
        });

        user.password = bcrypt.hashSync(password, 10);
        user.confirm = true;
        user.role = 1;

        await user.save();

        const instructor = new Instructor({
            name,
            lastName,
            age,
            speciality,
            phone,
            user: user._id,
        });

        await instructor.save();

        res.json({ message: "Instructor Agregado" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

//getcoursesbyinstructor
const getCoursesByInstructor = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            const error = new Error('Id Requerido');
            return res.status(400).json(error.message);
        }

        //buscar el instructor por el id del usuario
        const instructor = await Instructor.findOne({ user: id });
        if (!instructor) {
            const error = new Error('Instructor no encontrado');
            return res.status(404).json(error.message);
        }
        //buscar los cursos por el id del instructor
        const courses = await Courses.find({ instructor: instructor._id });
        res.json(courses);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}


export {
    getInstructors,
    addInstructor,
    getCoursesByInstructor
}