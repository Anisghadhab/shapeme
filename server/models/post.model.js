const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        description: {
            type: String,
            required: [true, '{PATH} is required'],
            trim: true,
            maxlength: [500, "the {PATH} must be at last 500 characters"]
        },
        // userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        image: {
            type: String,
        },
        creator: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "User"
        }, creatorFirstName: {
            type: String,
            required: [true, '{PATH} is required']
        },
        likeCount: {
            type: Number,
            default: 0,
        },
        comments: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "users",
                },
                text: {
                    type: String,
                    required: [true, '{PATH} is required'],
                    trim: true
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],

    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
