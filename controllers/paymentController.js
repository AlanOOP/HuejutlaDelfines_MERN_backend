import Stripe from 'stripe';


const stripeSecretKey = 'sk_test_51QAw2dF74rWo8I49fHGC9CJJQn2GSojAen0GFzfSMOsq7Edh95hwdBjVsGkjSEB8FxfzArWomFeV8OSEURIuDDLn00aGWSm7s1';

const stripe = new Stripe(stripeSecretKey);

export const newPayment = async (req, res) => {
    try {
        console.log(req.body);
        const myPayment = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "GBP",
            metadata: {
                company: "E-Learning",
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });

        console.log(myPayment);

        res.status(201).json({
            success: true,
            client_secret: myPayment.client_secret,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error al procesar el pago",
        });
    }
}