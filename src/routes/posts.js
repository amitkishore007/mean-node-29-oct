const PostsController = require('../controllers/PostsController');
const express = require('express');
const multer =  require('multer');
const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png':'png',
    'image/jpeg':'jpg',
    'image/jpg':'jpg'
};
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error  = new Error('invalid mime type');
        if (isValid) {
            error = null;
        }
        cb(error, 'uploads');
    },
    filename: (req, file, cb)=>{
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name+'-'+Date.now()+'.'+ext);

    }
});

router.get('', PostsController.getAllPosts);
router.post('/create', multer({ storage: storage }).single('image'), PostsController.createPost);
router.delete('/delete/:id', PostsController.deletePost);
router.get('/:id', PostsController.getOnePost);
router.put('/update/:id', PostsController.updatePost);

module.exports = router;