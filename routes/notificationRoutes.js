import {
    addNotification,
    getNotifications,
    updateNotification
} from '../controllers/notificationController.js';
import express from 'express';

const router = express.Router();

router.get('/notification', getNotifications);
router.post('/notification', addNotification);
router.put('/notification', updateNotification);

export default router;
