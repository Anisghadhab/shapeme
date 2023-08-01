import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, IconButton, Typography, } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import SideNav from './SideNav';
const AllPosts = ({ posts }) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const [likes, setLikes] = useState({});
    const addLike = (postId) => {
        // Disable the button to prevent multiple likes
        document.getElementById('btn').disabled = true;

        

        axios
            .patch(`http://localhost:8000/api/likePost/${postId}`)
            .then((response) => {
                console.log(response.data);
                setLikes((prevLikes) => ({
                    ...prevLikes,
                    [postId]: response.data.likeCount,
                }));
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const textStyle = {
        fontFamily: 'Arial, sans-serif', // Replace with your desired font-family
        fontSize: '18px', // Adjust the font size as needed
        lineHeight: '1.6', // Adjust line-height for better readability
        color: '#6c757d', // Use the color code for secondary text
        textAlign: 'left', // Align text to the left (start)
      };
    const formatDate = (date) => {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const year = d.getFullYear().toString();
        return `${day}/${month}/${year}`;
    }; console.log(JSON.stringify(posts));
    return (
        <div>
                        {/* <SideNav /> */}


            {posts.map(post => (
                <Card  key={post._id}>
                    <div key={post._id}>

                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">

                                </Avatar>
                            }
                            action={
                                <IconButton>
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={ <Link  to={'/shapeme/profile/'+post.creator} className='text-secondary text-decoration-none ' >{post.creatorFirstName}</Link> }
                            subheader={formatDate(post.createdAt)}
                        />


                        <CardContent className='ml-4 '  >
                            <Typography variant="body2" style={textStyle}  >
                                {post.description}
                            </Typography>
                        </CardContent>

                        <CardMedia
                            component="img"
                            height="10%"
                            image={post.image}
                            alt={post.creatorFirstName}
                        />
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <Checkbox
                                    icon={<FavoriteBorder />}
                                    checkedIcon={<Favorite sx={{ color: "red" }} />}
                                    onClick={() => addLike(post._id)}
                                    id='btn'
                                />{likes[post._id] || post.likeCount}
                            </IconButton>
                            <IconButton aria-label="share">

                            </IconButton>
                        </CardActions>

                    </div>
                </Card>
            ))}

        </div>
    )
}

export default AllPosts