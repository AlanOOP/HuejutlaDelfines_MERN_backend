import Membership from "../models/Membership.js";

export const getMemberships = async (req, res) => {
    try {
        const memberships = await Membership.find();
        res.status(200).json(memberships);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const getMembership = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {

        const membership = await Membership.findById(id);
        if (!membership) {
            const error = new Error("Membresia no encontrada");
            return res.status(404).json(error.message);

        }

        res.status(200).json(membership);

    } catch (error) {
        console.log(error)
    }
}

export const addMemberships = async (req, res) => {
    const membership = req.body;
    const newMembership = new Membership(membership);
    try {
        await newMembership.save();
        res.status(201).json(newMembership);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const updateMembership = async (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;

    if (!id) {
        const error = new Error("Id es requerido");
        return res.status(400).json(error.message);
    }

    try {
        const membership = await Membership.findById(id);
        if (!membership) {
            const error = new Error("Membresia no encontrada");
            return res.status(404).json(error.message);
        }

        membership.amount = amount;
        await membership.save();

        res.json({ message: "Membresia actualizada" });

    } catch (error) {

    }

}