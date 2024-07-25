import Comments from "../models/Comments.js";
import News from "../models/News.js";

export const getComments = async (req, res) => {
    try {
        const comments = await Comments.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCommentsByNewsId = async (req, res) => {
    const { newsId } = req.params;

    try {

        const news = await News.findById(newsId);

        if (!news) {
            const error = new Error('News not found');
            return res.status(404).json(error.message);
        }

        const comments = await Comments.find({ newsId: newsId, isPublished: true });

        if (!comments) {
            const error = new Error('Comments not found');
            return res.status(404).json(error.message);
        }

        res.status(200).json(comments);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const createComment = async (req, res) => {
    const { newsId, comment } = req.body;

    try {

        const news = await News.findById(newsId);

        if (!news) {
            const error = new Error('News not found');
            return res.status(404).json(error.message);
        }

        const newComment = new Comments({ newsId, comment });
        await newComment.save();

        res.status(200).json(newComment);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const updateComment = async (req, res) => {
    const { id } = req.params;
    const { isPublished } = req.body;

    try {
        const updatedComment = await Comments.findByIdAndUpdate(id, { isPublished }, { new: true });

        if (!updatedComment) {
            const error = new Error('Comment not found');
            return res.status(404).json(error.message);
        }

        res.status(200).json(updatedComment);

    } catch (error) {
        console.log(error);

    }

}

