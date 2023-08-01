const Post = require('../models/post.model');
module.exports = {

    createPost: (req, res) => {
        const url = req.protocol + '://' + req.get('host');
        const imagePath = req.file ? url + '/' + req.file.filename : null; // Get the file path from req.file
        console.log("FILE=======================>",req.file)
        console.log("PATH============================>",imagePath)
        const newPost = new Post(
            {
                description: req.body.description,
                creator: req.body.creator,
                creatorFirstName: req.body.creatorFirstName,
                image: imagePath,

            }
        );
        newPost.save()
            .then(post => res.json(post))
            .catch(err => res.status(400).json(err));
    },
    getPosts: async (req, res) => {

        try {
            const post = await
                Post.find()
                    .sort({ createdAt: -1 });

            res.status(200).json(post);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    getPost: async (req, res) => {
        const { id } = req.params;

        try {
            const post = await Post.findById(id);

            res.status(200).json(post);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
    updatePost: async (req, res) => {
        const { id } = req.params;
        const { title, description, creator, image } = req.body;

        const updatedPost = { creator, title, description, image, _id: id };

        await Post.findByIdAndUpdate(id, updatedPost, { new: true });

        res.json(updatedPost);
    },

    deletePost: async (req, res) => {
        const { id } = req.params;

        await Post.findByIdAndRemove(id);

        res.json({ message: "Post deleted successfully." });
    },
    likePost: async (req, res) => {
        const { id } = req.params;

        const post = await Post.findById(id);

        const updatedPost = await Post.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

        res.json(updatedPost);
    },
    commentPost: async (req, res) => {
        const { id } = req.params;
        const { text, user } = req.body;

        try {
            const post = await Post.findById(id);
            const newComment = {
                user,
                text,
                date: new Date(),
            };

            post.comments.unshift(newComment);
            await post.save();

            res.status(201).json(post);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }



}