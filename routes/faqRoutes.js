import express from 'express';
import {
    getFaqs,
    getFaqById,
    addFaq,
    updateFaq,
    deleteFaq
} from '../controllers/faqsController.js';

const router = express.Router();

router.get('/faq', getFaqs);
router.get('/faq/:id', getFaqById);
router.post('/faq', addFaq);
router.put('/faq/:id', updateFaq);
router.delete('/faq/:id', deleteFaq);


export default router;