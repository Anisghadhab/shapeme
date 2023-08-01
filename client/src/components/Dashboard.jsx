import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
// import Rightbar from "../components/Rigthbar";
import AddPost from "../components/AddPost";
import SideNav from "./SideNav";
import Feed from "../components/Feed";
import { getAllPostsRoute } from "../utils/APIRoutes";
function Dashboard(props) {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    const [userName, setUserName] = useState(props.userName)
    const navigate = useNavigate();

    useEffect(() => {
        const navigationTo = async () => {
            if (!localStorage.getItem("userLogedIn")) {
                navigate("/login");
            } else {
                setCurrentUser(
                    await JSON.parse(localStorage.getItem("userLogedIn"))
                    
                );
                console.log("user from dasgboard", currentUser)
                setIsLoaded(true);
            }
        };
        navigationTo();
    }, []);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (currentUser) {
            axios
                .get(getAllPostsRoute)
                .then((res) => {
                    console.log(currentUser)
                    setPosts(res.data);
                    setIsLoading(false);
                })
                .catch((err) => console.log(err));
        }
    }, [currentUser]);
    const addNewPost = (newPost) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]);
    };
    return (
        <div className="d-flex">
            {/* sx={{ width: 700 }} */}
            {/* <SideNav />direction="row" spacing={2} justifyContent="space-between" */}
            
            <div className="col-4">
                <SideNav/>
            </div>
            <Stack className="col-5">
                <Box className=' '>
                    <AddPost userName = {userName} onAddPost={addNewPost}   />
                    <Feed  posts={posts} setPosts={setPosts} />
                </Box>
                

                {/* <Rightbar /> */}
            </Stack>
        </div>
    );
}

export default Dashboard;
