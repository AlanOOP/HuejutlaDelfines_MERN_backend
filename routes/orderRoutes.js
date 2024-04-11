import express from 'express';

import {
    createOrder,
    captureOrder,
    cancelOrder
} from '../controllers/orderController.js'

const router = express.Router();

router.post('/create-order', createOrder);
router.get('/capture-order', captureOrder);
router.get('/cancel-order', cancelOrder);

export default router;