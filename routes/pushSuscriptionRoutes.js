import { Router } from 'express';
import { createSuscription } from '../controllers/pushSuscriptionController.js';

const router = Router();

router.post('/subscribe', createSuscription);


export default router;