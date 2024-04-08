import express from 'express';
import {
    getEnrollments,
    getEnrollment,
    createEnrollment
} from '../controllers/enrollmentController.js';

const router = express.Router();

router.get('/enrollments', getEnrollments);
router.get('/enrollment/:id', getEnrollment);
router.post('/enrollment', createEnrollment);


export default router;