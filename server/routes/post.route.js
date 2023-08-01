const { createPost, getPosts, getPost, updatePost, deletePost, likePost, commentPost } = require('../controllers/post.controller');
const { v4: uuidv4 } = require('uuid');

const multer = require('multer');
const DIR = './public/';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  }
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

module.exports = (app) => {
  app.post('/api/newPost', upload.single('image'), createPost); // Use the upload middleware for handling file upload
  app.get('/api/posts', getPosts);
  app.get('/api/showPost/:id', getPost);
  app.put('/api/updatePost/:id', updatePost);
  app.delete('/api/deletePost/:id', deletePost);
  app.patch('/api/likePost/:id', likePost);
  app.patch('/api/:id/commentPost', commentPost);
};
