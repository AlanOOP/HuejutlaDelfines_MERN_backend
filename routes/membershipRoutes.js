import express from 'express';
import {
    getMemberships,
    getMembership,
    addMemberships,
    updateMembership
} from '../controllers/membershipController.js';

const router = express.Router();

router.get('/membership', getMemberships);
router.get('/membership/:id', getMembership);
router.post('/membership', addMemberships);
router.put('/membership/:id', updateMembership);

export default router;