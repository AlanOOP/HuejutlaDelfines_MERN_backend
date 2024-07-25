import StudentEvaluation from "../models/StudentEvaluation.js";
import Student from "../models/Student.js";
import Users from "../models/Users.js"
import { calculateAge, generateHeightWeight } from "../helpers/generateHeightAndWeight.js";

//get evaluations by student and month and year

export const getStudenEvaluations = async (req, res) => {
    try {
        const evaluations = await StudentEvaluation.find();
        res.json(evaluations);
    } catch (error) {
        console.log(error);
    }

}

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

export const getEvaluationsByStudentFive = async (req, res) => {
    const { id } = req.params;

    console.log(id)

    try {

        //buscar los estudiante del usuario by id 

        const student = await Student.findById(id);

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
            return res.status(404).json({ message: error.message });
        }

        const age = calculateAge(student.age);

        console.log(age)

        let { height, weight } = student;

        // Verificar que la evaluación no exista para la fecha
        const evaluationExist = await StudentEvaluation.findOne({ student: studentId, date });
        if (evaluationExist) {
            const error = new Error("Ya existe una evaluación para esta fecha");
            return res.status(400).json({ message: error.message });
        }

        if (!height || !weight) {
            const hw = generateHeightWeight(age);
            height = hw.height;
            weight = hw.weight;

            student.height = height;
            student.weight = weight;

            await student.save();
        }



        // Validar que la distancia y el tiempo sean valores positivos y razonables
        if (distance <= 0) {
            return res.status(400).json({ message: "La distancia debe ser un valor positivo" });
        }
        if (time <= 0) {
            return res.status(400).json({ message: "El tiempo debe ser un valor positivo" });
        }

        const evaluation = new StudentEvaluation({
            student: studentId,
            trainingType,
            date,
            time,
            distance,
            year,
            month,
            weight: weight,
            height: height
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

