import Notification from "../models/Notification.js";

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

        const { title, message, time } = req.body

        if (!title || !message || !time) {
            const error = new Error('Por favor complete todos los campos');
            return res.status(400).json(error.message);
        }

        await Notification.findByIdAndUpdate('6706b8700b9f302dfb2dfca7', {
            title,
            message,
            time
        })

        res.json({ message: 'Notificación actualizada' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' })
    }
}