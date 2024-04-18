import express from 'express';

import {
    createOrder,
    captureOrder,
    cancelOrder,
    createMembershipOrder
} from '../controllers/orderController.js'

const router = express.Router();

router.post('/create-order', createOrder);
router.post('/create-membership-order', createMembershipOrder);
router.get('/capture-order', captureOrder);
router.get('/cancel-order', cancelOrder);

export default router;