import Galery from "../models/Galery.js";
import cloudinary from "../helpers/cloudinary.js";

const getGalery = async (req, res) => {
    try {
        const galery = await Galery.find();
        res.json(galery);
    } catch (error) {
        console.error(error);
    }
};

const createGalery = async (req, res) => {
    let image = req.file;
    //crear path 

    try {
        const result = await cloudinary.uploader.upload(image.path, {
            folder: 'activities',
            width: 1200,
            crop: "scale"
        });

        const newImage = new Galery({
            url: result.secure_url,
            public_id: result.public_id
        });

        await newImage.save();

        res.json(newImage);

    } catch (error) {
        console.log(error);
    }

}

const deleteGalery = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Galery.findByIdAndDelete(id);
        const result = await cloudinary.uploader.destroy(image.public_id);
        res.json(result);
    }
    catch (error) {
        console.log(error);
    }

}


export {
    getGalery,
    createGalery,
    deleteGalery
}