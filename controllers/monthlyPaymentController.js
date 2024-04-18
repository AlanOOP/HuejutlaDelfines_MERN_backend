import MonthlyPayment from "../models/MonthlyPayment.js";
import Student from "../models/Student.js";

//obtener los pagos mensuales de un estudiantes by id

const getMonthlyPayments = async (req, res) => {
    const { id } = req.params;

    try {
        const student = await Student.findById(id);
        if (!student) {
            const error = new Error("Estudiante no encontrado");
            return res.status(404).json(error.message);
        }

        const monthlyPayments = await MonthlyPayment.find({ student: id });
        res.status(200).json(monthlyPayments);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export { getMonthlyPayments };