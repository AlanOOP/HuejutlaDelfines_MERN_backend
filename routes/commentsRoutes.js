import express from 'express';
import {
    getComments,
    getCommentsByNewsId,
    createComment,
    updateComment
} from '../controllers/commentsController.js';

const router = express.Router();

router.get('/comments', getComments);
router.get('/comments/:newsId', getCommentsByNewsId);
router.post('/comments', createComment);
router.put('/comments/:id', updateComment);

export default router;