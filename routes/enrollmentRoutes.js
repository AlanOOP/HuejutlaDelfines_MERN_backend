import express from 'express';
import {
    getEnrollments,
    getEnrollment,
    createEnrollment,
    getEnrollmentByCourse
} from '../controllers/enrollmentController.js';

const router = express.Router();

router.get('/enrollments', getEnrollments);
router.get('/enrollment/:id', getEnrollment);
router.post('/enrollment', createEnrollment);
router.get('/enrollment/course/:id', getEnrollmentByCourse);

export default router;