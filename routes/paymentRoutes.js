import { Router } from "express";
import { newPayment } from '../controllers/paymentController.js'

const router = Router();

router.post('/payment', newPayment);

export default router;