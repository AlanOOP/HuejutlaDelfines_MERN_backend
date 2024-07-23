import StudentEvaluation from "../models/StudentEvaluation.js";
import Student from "../models/Student.js";
import Users from "../models/Users.js"

//get evaluations by student and month and year

export const getEvaluationsByStudent = async (req, res) => {
    const { studentId } = req.params;
    const { month, year } = req.body;

    try {

        const student = await Student.findById(studentId);
        if (!student) {
            const error = new Error("Estudiante no encontrado");
            return res.status(404).json(error.message);
        }
        const evaluations = await StudentEvaluation.find({ student: studentId, year: year, month: month });

        res.json(evaluations);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" });
    }
}



//get evaluations by user 

export const getEvaluationsByUser = async (req, res) => {
    const { id } = req.params;

    console.log(id)

    try {
        //buscar el usuario
        const userExist = await Users.findById(id);

        if (!userExist) {
            const error = new Error("Usuario no encontrado");
            return res.status(404).json(error.message);
        }

        //buscar los estudiante del usuario by id 
        const student = await Student.findOne({ user: id });

        if (!student) {
            const error = new Error("Estudiante no encontrado");
            return res.status(404).json(error.message);
        }

        //buscar las evaluaciones del estudiante

        // console.log(student)
        const evaluations = await StudentEvaluation.find({ student: student._id })
            .sort({ createdAt: -1 })  // Ordena por fecha de creación en orden descendente
            .limit(5);

        res.json(evaluations);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error del servidor" });
    }
}


//create evaluation
export const createEvaluation = async (req, res) => {
    const { studentId } = req.params;
    const { trainingType, date, time, distance, year, month } = req.body;
    try {
        const student = await Student.findById(studentId);
        if (!student) {
            const error = new Error("Estudiante no encontrado");
            return res.status(404).json(error.message);
        }

        //Verificar la fehca que no exista
        const evaluationExist = await StudentEvaluation.findOne({ student: studentId, date });
        if (evaluationExist) {
            const error = new Error("Ya existe una evaluación para esta fecha");
            return res.status(400).json(error.message);
        }

        const evaluation = new StudentEvaluation({
            student: studentId, trainingType, date, time, distance, year, month
        });
        await evaluation.save();
        res.json(evaluation);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" });
    }
}

//update evaluation
export const updateEvaluation = async (req, res) => {
    const { id } = req.params;
    const { trainingType, date, time, distance, year, month } = req.body;
    try {
        const evaluation = await StudentEvaluation.findById(id);
        if (!evaluation) {
            const error = new Error("Evaluación no encontrada");
            return res.status(404).json(error.message);
        }
        evaluation.trainingType = trainingType;
        evaluation.date = date;
        evaluation.time = time;
        evaluation.distance = distance;
        evaluation.year = year;
        evaluation.month = month;
        await evaluation.save();
        res.json(evaluation);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" });
    }
}

