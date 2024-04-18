import express from 'express';
import {
    getMonthlyPayments,
} from '../controllers/monthlyPaymentController.js';

const router = express.Router();

router.get('/payments/:id', getMonthlyPayments);


export default router;