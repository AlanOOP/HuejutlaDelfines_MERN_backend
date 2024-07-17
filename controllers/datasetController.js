import Courses from '../models/Courses.js';
import Instructor from '../models/Instructor.js';
import StudentEvaluation from '../models/StudentEvaluation.js';
import Student from '../models/Student.js';
import Schedule from '../models/Schedule.js';

import moment from 'moment';

// Función para obtener la semana del año
const getWeekOfYear = (date) => {
    return moment(date).week();
};

const calculateWeeklyVariables = (students, evaluations) => {
    let data = [];

    students.forEach(student => {
        const studentEvaluations = evaluations.filter(evaluation => evaluation.student._id.toString() === student._id.toString());

        // Agrupar evaluaciones por semana
        const evaluationsByWeek = {};
        studentEvaluations.forEach(evaluation => {
            const week = getWeekOfYear(evaluation.date);
            if (!evaluationsByWeek[week]) {
                evaluationsByWeek[week] = [];
            }
            evaluationsByWeek[week].push(evaluation);
        });

        // Calcular variables semanales
        for (const [week, evals] of Object.entries(evaluationsByWeek)) {
            const totalEvaluations = evals.length;
            const averageTime = evals.reduce((sum, evaluation) => sum + parseFloat(evaluation.time), 0) / totalEvaluations;
            const averageDistance = evals.reduce((sum, evaluation) => sum + parseFloat(evaluation.distance), 0) / totalEvaluations;

            data.push({
                Edad: new Date().getFullYear() - new Date(student.age).getFullYear(),
                Estatura: student.height || 0,  // Suponiendo que se añadirá el campo estatura
                Promedio_asistencia: totalEvaluations,
                Distancia_promedio: averageDistance,
                Tiempo_promedio: averageTime,
                Tiempo_para_avanzar: student.time_to_advance || 0,  // Suponiendo que tenemos el tiempo necesario para avanzar en la colección de estudiantes
                Nivel_habilidad: student.level // Asumiendo que hay un campo nivel en la colección de estudiantes
            });
        }
    });

    return data;
};

const getPreparedDataset = async (req, res) => {
    try {
        // Suponiendo que tienes una función que obtiene los datos combinados de las colecciones
        const { students, evaluations } = await getCombinedData();

        const dataset = calculateWeeklyVariables(students, evaluations);

        res.json(dataset);
    } catch (error) {
        console.error('Error preparing dataset:', error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Función para obtener los datos combinados de las colecciones
const getCombinedData = async () => {
    const students = await Student.find().populate('user', 'email');
    const evaluations = await StudentEvaluation.find().populate('student', 'name lastName age');
    const courses = await Courses.find().populate('instructor', 'name lastName age speciality');
    const schedules = await Schedule.find().select('day hour');

    return { students, evaluations, courses, schedules };
};

export { getPreparedDataset };