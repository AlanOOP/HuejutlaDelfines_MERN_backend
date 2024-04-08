import Enrollments from "../models/Enrollments.js";
import Courses from "../models/Courses.js";
import Payments from "../models/Payments.js";
import Student from "../models/Student.js";
import { generateReference } from "../helpers/generateReference.js";

// Get all enrollments

const getEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollments.find().populate("user").populate("course");
        res.json(enrollments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// Get single enrollment

const getEnrollment = async (req, res) => {

    try {
        const enrollment = await Enrollments.findById(req.params.id);

        if (!enrollment) {
            const error = new Error("No se encontro la matricula");
            return res.status(404).json(error.message);
        }
        return res.json(enrollment);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}


//add to course enrollment

const createEnrollment = async (req, res) => {

    const { id_student, id_course, amount } = req.body;

    try {
        const student = await Student.findById(id_student);
        const course = await Courses.findById(id_course);

        if (!student || !course) {
            const error = new Error("Estudiante o curso no encontrado");
            return res.status(404).json(error.message);
        }

        if (course.cupos === 0) {
            const error = new Error("No hay cupos disponibles");
            return res.status(404).json(error.message);
        }

        const enrollmentExist = await Enrollments.findOne({ student: student._id });

        if (enrollmentExist) {
            const error = new Error("El estudiante ya esta inscrito en el curso");
            return res.status(404).json(error.message);
        }


        const newEnrollment = new Enrollments({
            student: student,
            course: course,
            dateEnrollment: new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
            amount: amount
        });
        const enrollment = await newEnrollment.save();

        const newPayment = new Payments({
            paymentDate: new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
            amount: amount,
            referenceNumber: generateReference(),
            enrollment: enrollment._id
        });

        const payment = await newPayment.save();
        course.cupos -= 1;
        await course.save();

        res.json({ enrollment, payment });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }

}


export {
    getEnrollments,
    getEnrollment,
    createEnrollment
}