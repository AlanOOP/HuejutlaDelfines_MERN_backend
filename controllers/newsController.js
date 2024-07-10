import News from "../models/News.js";
import fs from "fs";
import path, { dirname } from "path";

const deleteImages = (images, mode) => {

    const __dirname = dirname(fileURLToPath(import.meta.url));
    let basePath = path.resolve(__dirname + "../../") + "/public/uploads/";

    for (let i = 0; i < images.length; i++) {
        let filePath = "";
        if (mode === "file") {
            filePath = basePath + `${images[i].filename}`;
        } else {
            filePath = basePath + `${images[i]}`;
        }
        // console.log(filePath);
        if (fs.existsSync(filePath)) {
            // console.log("Exists image");
            console.log("existe");
        }
        fs.unlink(filePath, (err) => {
            if (err) {
                return err;
            }
        });
    }
}

const getNews = async (req, res) => {
    try {
        const news = await News.find();
        res.status(200).json(news);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getNewsById = async (req, res) => {
    const { id } = req.params;

    try {
        const news = await News.findById(id);

        if (!news) {
            const error = new Error("No se encontro la noticia");
            return res.status(404).json(error.message);
        }

        res.json(news);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const addNews = async (req, res) => {

    const { title, content, date } = req.body;
    const img = req.files

    try {

        if (!title || !content || !img || !date) {
            const error = new Error("Por favor rellene todos los campos");
            return res.status(400).json(error.message);
        }

        const newNews = new News({
            title,
            content,
            date,
            img: img[0].filename
        });

        const news = await newNews.save();

        res.status(201).json(news);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateNews = async (req, res) => {
    const { id } = req.params;
    const { title, content, date, isPublished } = req.body;
    const img = req.files;

    try {
        if (!title || !content || !date || !isPublished) {
            const error = new Error("Por favor rellene todos los campos");
            return res.status(400).json(error.message);
        }

        const news = await News.findById(id);

        if (!news) {
            const error = new Error("No se encontro la noticia");
            return res.status(404).json(error.message);
        }

        let newImg = news.img;

        if (img) {
            newImg = img[0].filename;
        }

        const updatedNews = { title, content, date, img: newImg };

        const newsUpdated = await News.findByIdAndUpdate(id, updatedNews, { new: true });

        res.json(newsUpdated);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteNews = async (req, res) => {
    const { id } = req.params;

    try {
        const news = await News.findById(id);

        if (!news) {
            const error = new Error("No se encontro la noticia");
            return res.status(404).json(error.message);
        }

        const deleteNews = await News.findByIdAndDelete(id);

        res.json({ message: "Noticia eliminada" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

export {
    getNews,
    getNewsById,
    addNews,
    updateNews,
    deleteNews
}