import axios from 'axios';
import Enrollments from '../models/Enrollments.js';
import Payments from '../models/Payments.js';
import Student from '../models/Student.js';
import Courses from '../models/Courses.js';
import { generateReference } from "../helpers/generateReference.js";

const createOrder = async (req, res) => {

    const { id_student, id_course, amount } = req.body;
    console.log(req.body);


    //inscripcion al curso con paypal 
    //crear orden de pago

    const order = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "MXN",
                    value: amount,
                },
            },
        ],
        application_context: {
            brand_name: "Cursos Online",
            landing_page: "NO_PREFERENCE",
            user_action: "PAY_NOW",
            return_url: `${process.env.FRONTEND_URL}/capture-order`,
            // return_url: `http://localhost:${3000}/api/capture-order`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel-order`,
        },
    }

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

        await newEnrollment.save();

        course.cupos -= 1;
        await course.save();

        //SAVE PAYMENT

        const newPayment = new Payments({
            paymentDate: new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
            amount: amount,
            referenceNumber: generateReference(),
            enrollment: newEnrollment._id
        });

        const payment = await newPayment.save();

        // format the body
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");

        // Generate an access token
        const { data: { access_token }, } = await axios.post(
            "https://api-m.sandbox.paypal.com/v1/oauth2/token", params,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                auth: {
                    username: process.env.PAYPAL_API_CLIENT,
                    password: process.env.PAYPAL_API_SECRET,
                },
            }
        );



        const response = await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders`, order, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
        });


        return res.send(response.data);

    } catch (error) {
        // console.log(error);
        return res.status(400).json({
            message: "No se pudo crear la orden de pago",
        });
    }


    //redireccionar a paypal

}

const captureOrder = async (req, res) => {
    const { token } = req.query;

    try {
        const response = await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
            auth: {
                username: process.env.PAYPAL_API_CLIENT,
                password: process.env.PAYPAL_API_SECRET,
            }
        });

        return res.send(response.data).json();

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "No se pudo capturar la orden de pago",
        });
    }

}

const cancelOrder = async (req, res) => {
    res.send('Order canceled');
}


export { createOrder, captureOrder, cancelOrder };