import Courses from '../models/Courses.js';
import Instructor from '../models/Instructor.js';
import StudentEvaluation from '../models/StudentEvaluation.js';
import Student from '../models/Student.js';
import Schedule from '../models/Schedule.js';

const getDataset = async (req, res) => {
    try {
        // Obtener cursos con detalles de instructores
        const courses = await Courses.find()
            .populate('instructor', 'name lastName age speciality')
            .select('title category instructor');

        // Obtener evaluaciones con detalles de estudiantes
        const evaluations = await StudentEvaluation.find()
            .populate('student', 'name lastName age')
            .select('trainingType date time distance student');

        // Obtener horarios
        const schedules = await Schedule.find().select('day hour');

        // Obtener estudiantes con detalles de usuarios
        const students = await Student.find()
            .populate('user', 'email')
            .select('name lastName age user');

        // Combinar datos
        const dataset = {
            courses,
            evaluations,
            schedules,
            students
        };

        res.json(dataset);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: "Server Error" });
    }
};

export { getDataset };
