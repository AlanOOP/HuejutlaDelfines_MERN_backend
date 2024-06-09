import {
    getEvaluationsByStudent,
    updateEvaluation,
    createEvaluation,
    getEvaluationsByUser
} from '../controllers/studentEvaluationController.js';
import express from 'express';

const router = express.Router();

router.post('/evaluation/:studentId', getEvaluationsByStudent);
router.put('/evaluation/:id', updateEvaluation);
router.post('/evaluation-create/:studentId', createEvaluation);
router.get('/student/evaluations/:id', getEvaluationsByUser);

export default router;