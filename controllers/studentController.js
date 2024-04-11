
import Student from "../models/Student.js";
import Users from "../models/Users.js";
import Logs from "../models/Logs.js";
// Get all students

const getStudents = async (req, res) => {
    try {
        const students = await Student.find().populate("user");
        res.json(students);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// Get single student

const getStudent = async (req, res) => {

    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            const error = new Error("No se encontro el estudiante");
            return res.status(404).json(error.message);
        }
        return res.json(student);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// get student by user

const getStudentByUser = async (req, res) => {

    const { id } = req.params;

    //log de prueba ip, navegador, hora de peticion, localizacion

    try {
        const userExist = await Users.findById(id);
        if (!userExist) {
            const error = new Error("No se encontro el usuario");
            return res.status(404).json(error.message);
        }

        const student = await Student.findOne({ user: userExist._id }).populate({
            path: "user",
            select: "-password -confirm -token -createdAt -updatedAt -__v",
        })
        if (!student) {
            const error = new Error("No se encontro el estudiante");
            return res.status(404).json(error.message);
        }
        return res.json(student);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }

}

const updateProfile = async (req, res) => {
    const { id } = req.params;
    const { name, lastName, phone } = req.body;

    try {
        const student = await Student.findById(id);
        if (!student) {
            const error = new Error("No se encontro el estudiante");
            return res.status(404).json(error.message);
        }

        student.name = name;
        student.lastName = lastName;
        student.phone = phone;
        await student.save();

        //log de prueba ip, navegador, hora de peticion, localizacion
        const log = new Logs({
            ip: req.ip,
            navegador: req.headers["user-agent"],
            description: "Actualizacion de perfil",
            url: "/student/update",
            user: student.user
        });

        await log.save();

        return res.json({ message: "Estudiante actualizado" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}



export {
    getStudents,
    getStudent,
    getStudentByUser,
    updateProfile
}