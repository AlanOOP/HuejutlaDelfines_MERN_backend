import {
    getStudenEvaluations,
    getEvaluationsByStudent,
    updateEvaluation,
    createEvaluation,
    getEvaluationsByUser,
    getEvaluationsByStudentFive
} from '../controllers/studentEvaluationController.js';
import express from 'express';

const router = express.Router();

router.get('/evaluation', getStudenEvaluations);
router.post('/evaluation/:studentId', getEvaluationsByStudent);
router.put('/evaluation/:id', updateEvaluation);
router.post('/evaluation-create/:studentId', createEvaluation);
router.get('/student/evaluations/:id', getEvaluationsByUser);
router.get('/student/evaluations-student/:id', getEvaluationsByStudentFive);

export default router;