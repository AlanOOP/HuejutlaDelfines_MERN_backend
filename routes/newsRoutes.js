import express from 'express';
import multer from 'multer';
import {
    getNews,
    getNewsById,
    addNews,
    updateNews,
    deleteNews,
} from '../controllers/newsController.js';

const router = express.Router();

const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, './public/uploads/')
    // },
    // filename: function (req, file, cb) {
    //     cb(null, Math.random() + path.extname(file.originalname))
    // }
})

const upload = multer({ storage });

router.get('/news', getNews);
router.get('/news/:id', getNewsById);
router.post('/news', upload.single('img'), addNews);
router.put('/news/:id', upload.any(), updateNews);
router.delete('/news/:id', deleteNews);

export default router;