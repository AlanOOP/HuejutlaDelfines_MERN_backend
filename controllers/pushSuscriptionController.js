import webpush from "web-push";
import PushSuscription from "../models/PushSuscription.js";


const vapidKeys = {
    publicKey: "BFqF9D2BByNesBz3cMr77s8MXdLNbdHYW-gYNwGNEWMMFE9OFAsOfTnvjFTt2AaA0sf82ld1cuuByeVB2JgaWio",
    privateKey: "sghOLM5eu1HGum3dclvoGxiEJcrqQUAmAeuiMxRP6HQ"
};

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const createSuscription = async (req, res) => {
    try {
        const subscription = req.body;

        // Verificar que la suscripción contiene el endpoint
        if (!subscription || !subscription.endpoint) {
            console.error('Suscripción inválida:', subscription);
            return res.status(400).json({ error: 'Suscripción inválida: falta el endpoint' });
        }

        // Crear el payload para la notificación
        const payload = JSON.stringify({ title: 'Notificación de prueba', body: 'Este es un mensaje de prueba' });

        // Enviar la notificación
        await webpush.sendNotification(subscription, payload);
        res.status(201).json({ message: 'Notificación enviada correctamente  🥺🥺' });
    } catch (error) {
        console.error('Error al enviar notificación:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
export {
    createSuscription
}