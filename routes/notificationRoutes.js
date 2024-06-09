import {
    addNotification,
    getNotifications
} from '../controllers/notificationController.js';
import express from 'express';

const router = express.Router();

router.get('/notification', getNotifications);
router.post('/notification', addNotification);

export default router;
