import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from "./Chart"
import '../assets/css/TestProfile.css'
import {
    Typography,
    Card,
    CardContent,
    CardActions,
    Container,
    Box,
    AppBar,
    Toolbar,
    Grid,
} from '@mui/material';
import { Link } from 'react-router-dom';
import SideNav from './SideNav';

const TestProfile = () => {
    const [userId, setUserId] = useState('');
    const [workouts, setWorkouts] = useState([]);
    const [routines, setRoutines] = useState([]);
    const [userName, setUserName] = useState("");


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/getloggeduser', {
                    withCredentials: true,
                });
                const userData = response.data;
                setUserId(userData._id);
                setUserName(userData.firstName)
                console.log("userId", userId)

                const routinesResponse = await axios.get('http://localhost:8000/api/routines', {
                    params: { userId: userData._id },
                    withCredentials: true,
                });
                setRoutines(routinesResponse.data.routines);
                console.log("routines:", routines)


                const workoutsResponse = await axios.get('http://localhost:8000/api/workouts', {
                    params: { userId: userData._id },
                    withCredentials: true,
                });
                setWorkouts(workoutsResponse.data.allWorkouts);
                console.log("workouts", workouts)

            } catch (error) {
                console.log(error);
            }
        };

        fetchUserData();
    }, []);
    const formatDateTime = (dateTimeString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const dateTime = new Date(dateTimeString);
        return dateTime.toLocaleDateString('en-US', options);
    };

    const calculateVolume = (exercise) => {
        let totalVolume = 0;
        exercise.sets.forEach((set) => {
            totalVolume += set.kg * set.reps;
        });
        return totalVolume;
    };
    const gradientStyle = {
        background: "rgb(252 250 238 / 13%)",
        // other styles if needed
      };
    return (
        <div>
            <SideNav />
            <Container mt={3}>
                <Grid  container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Typography variant="subtitle1">{userName}</Typography>
                            <Typography variant="caption">Number of workouts: {workouts.length}</Typography>
                        </Box>
                        <Typography variant="h5">Workouts Done</Typography>
                        {workouts.length > 0 ? (
                            workouts.map((oneWorkout) => {
                                const workoutVolume = oneWorkout.exercises.reduce((acc, exercise) => acc + calculateVolume(exercise), 0);
                                return (
                                    <Card style={gradientStyle}

                                    // key={oneWorkout._id} 
                                    sx={{ my: 2 }}>
                                        <CardContent >
                                            <Typography variant="h6">{oneWorkout.routineName}</Typography>
                                            <Typography variant="caption">{formatDateTime(oneWorkout.createdAt)}</Typography>
                                            <Typography variant="body1">
                                                {/* <Link to={`/shapeme/workout/${oneWorkout._id}`}>{oneWorkout.routineName}</Link> */}
                                            </Typography>
                                            <Typography variant="body2">Volume: {workoutVolume} kg</Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Box flexGrow={1}>
                                                {oneWorkout.exercises.map((oneExercise, index) => {
                                                    return (
                                                        <Typography key={index} variant="body2">
                                                            {oneExercise.sets.length} sets {oneExercise.exerciseName}
                                                        </Typography>
                                                    );
                                                })}
                                            </Box>
                                        </CardActions>
                                    </Card>
                                );
                            })
                        ) : (
                            <Typography variant="body2">No workouts found.</Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ mt: 8 }}>
                            {/* Container for Statistics */}
                            <Typography variant="h5">Statistics</Typography>
                            <Card style={gradientStyle}>
                                <CardContent>
                                
                                    < Chart />
                                </CardContent>
                            </Card>
                        </Box>
                        <Box sx={{ my: 3 }}>
                            {/* Container for Routines */}
                            <Typography variant="h5">Routines</Typography>
                            {routines.map((oneRoutine) => {
                                return (
                                    <Card sx={{ my: 3 }} 
                                    key={oneRoutine._id}
                                    >
                                        <CardContent style={gradientStyle}>
                                            <Typography variant="h7">
                                                <Link to={'/shapeme/routine/' + oneRoutine._id}>{oneRoutine.routineName}</Link>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default TestProfile;
