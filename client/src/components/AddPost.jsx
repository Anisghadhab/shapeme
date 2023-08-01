import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';

const AddPost = (props) => {
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null)
    const [currentUser, setCurrentUser] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    const [userName, setUserName] = useState(props.userName)
    const [userId, setUserId] = useState("")


    useEffect(() => {
        const navigationTo = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/getloggeduser', {
                    withCredentials: true,
                });
                const userData = response.data;
                setUserId(userData._id);
                console.log("userId", userData)

            } catch (error) {
                console.log(error);
            }
            if (!localStorage.getItem('userLogedIn')) {
                navigate("/login");
            }
            else {
                setCurrentUser(await JSON.parse(localStorage.getItem('userLogedIn')));
                setIsLoaded(true);
                console.log("hello user", userName)
            }
        }
        navigationTo();
    }, []);
    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('description', description);
        formData.append('creator', userId);
        formData.append('creatorFirstName', userName);
        formData.append('creatorLastName', currentUser.lastName);
        formData.append('image', image);
        axios.post('http://localhost:8000/api/newPost', formData)
            .then((res) => {
                // console.log(currentUser.post)
                console.log("submitRes", res);
                currentUser.post.push(res.data._id)
                console.log(currentUser.post)
                setDescription("")
                props.onAddPost(res.data);
            })
            .catch((err) => console.log(err));
    }

    const ImageHandler = (e) => {
        setImage(e.target.files[0]);
        console.log("imaaageee", image)
    };

    const theme = createTheme();
    return (
        <div className='mt-5'>
            {currentUser && (
                <div >
               {/* sx={{ margin: 5, pb: 2 }}   */}
               <Card className='p-1' >
                   
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',

                                }}
                            >

                                <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>

                                    <TextField

                                        margin="normal"
                                        required
                                        fullWidth
                                        label={"Share your thoughts " + userName}
                                        name="description"
                                        value={description}
                                        autoFocus
                                        onChange={(e) => setDescription(e.target.value)}
                                    />

                                    <Stack direction="row" alignItems="center" spacing={53}>

                                        <IconButton color="dark" aria-label="upload picture" style={{ color: '#1976d2', fontSize: 50 }} component="label">
                                            <input hidden accept="image/*" type="file" onChange={(e) => ImageHandler(e)} />
                                            <PhotoCamera />
                                        </IconButton>
                                        <Button className='btn '  variant="contained" component="label" >
                                            Post
                                            <input hidden type="submit" />
                                        </Button>
                                    </Stack>
                                </Box>
                            </Box>

                        </Container>
                    </ThemeProvider>
                </Card>
                </div>
            )}
        </div>
    );
};

export default AddPost;