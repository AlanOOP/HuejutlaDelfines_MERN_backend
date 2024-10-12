import Notification from "../models/Notification.js";
import { Expo } from 'expo-server-sdk';

// get all notifications

export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({}, 'title message time');
        res.json(notifications);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" });
    }
}

// create notification

export const addNotification = async (req, res) => {
    try {

        const { title, message, time } = req.body

        if (!title || !message || !time) {
            const error = new Error('Por favor complete todos los campos');
            return res.status(400).json(error.message);
        }

        const newNotification = new Notification({
            title,
            message,
            time
        })

        await newNotification.save();

        res.json({ message: 'Notificación creada' });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' })
    }
}

export const updateNotification = async (req, res) => {
    
    try {
        const { title, message, time } = req.body;
        if (!title || !message || !time) {
            const error = new Error('Por favor complete todos los campos');
            return res.status(400).json(error.message);
        }

        await Notification.findByIdAndUpdate('6706b8700b9f302dfb2dfca7', {
            title,
            message,
            time
        });

        let pushTokens = ['ExponentPushToken[EZOPr6IPtZ_0Xls76zDn9u]'];

        // Iniciar el cliente de Expo para enviar notificaciones
        let expo = new Expo({ useFcmV1: true });

        // Validar y crear mensajes para los tokens de Expo
        let messages = [];
        for (let pushToken of pushTokens) {
            // Verificar que el token sea válido
            if (!Expo.isExpoPushToken(pushToken)) {
                console.error(`Token no válido de Expo: ${pushToken}`);
                continue;
            }

            // Crear el mensaje de notificación
            messages.push({
                to: pushToken,
                sound: 'default',
                title: title,
                body: message,
                data: { time },
            });
        }

        // Dividir los mensajes en lotes
        let chunks = expo.chunkPushNotifications(messages);
        let tickets = [];

        // Enviar los lotes de notificaciones
        for (let chunk of chunks) {
            try {
                let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                tickets.push(...ticketChunk);
            } catch (error) {
                console.error(error);
            }
        }

        res.json({ message: 'Notificación actualizada' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' })
    }
}