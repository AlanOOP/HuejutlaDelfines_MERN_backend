
import Student from "../models/Student.js";
import Users from "../models/Users.js";
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

    console.log(req.ip, req.headers["user-agent"], new Date().toLocaleString(), req.headers["accept-language"]);

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



export {
    getStudents,
    getStudent,
    getStudentByUser
}