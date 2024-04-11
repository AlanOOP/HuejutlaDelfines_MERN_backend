import StudentEvaluation from "../models/StudentEvaluation.js";
import Student from "../models/Student.js";

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

