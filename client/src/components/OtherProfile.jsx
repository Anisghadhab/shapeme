import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from './Chart';
import { useParams } from 'react-router-dom';
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
    const [workouts, setWorkouts] = useState([]);
    const [routines, setRoutines] = useState([]);
    const [userName, setUserName] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const otherUserResponse = await axios.get('http://localhost:8000/api/getUserById/' + id, {
                    withCredentials: true,
                });
                setUserName(otherUserResponse.data.firstName);

                const routinesResponse = await axios.get('http://localhost:8000/api/routines', {
                    params: { userId: id },
                    withCredentials: true,
                });
                setRoutines(routinesResponse.data.routines);

                const workoutsResponse = await axios.get('http://localhost:8000/api/workouts', {
                    params: { userId: id },
                    withCredentials: true,
                });
                setWorkouts(workoutsResponse.data.allWorkouts);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserData();
    }, [id]); // Add id as a dependency, so the effect runs when the id changes.

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

    return (
        <div>
            <SideNav />
            <Container className='mr-1'>

                <Grid container spacing={3} >
                    <Grid item xs={12} md={6} >
                        <Card display="flex" className='p-3' flexDirection="column" alignItems="center">
                            <Typography variant="h5" style={{ fontWeight: 'bold' }}>{userName}</Typography>
                            <Typography variant="caption">Number of workouts: {workouts.length}</Typography>
                        </Card>
                        <Typography variant="h5" >Workouts Done</Typography>
                        {workouts.length > 0 ? (
                            workouts.map((oneWorkout) => {
                                const workoutVolume = oneWorkout.exercises.reduce(
                                    (acc, exercise) => acc + calculateVolume(exercise),
                                    0
                                );
                                return (
                                    <Card key={oneWorkout._id} sx={{ my: 2 }}>
                                        <CardContent>
                                            <Typography variant="h6">{oneWorkout.routineName}</Typography>
                                            <Typography variant="caption">{formatDateTime(oneWorkout.createdAt)}</Typography>
                                            <Typography variant="body1">
                                                {/* <Link to={`/shapeme/workout/${oneWorkout._id}`}>{oneWorkout.routineName}</Link> */}
                                            </Typography>
                                            <Typography variant="body2">Volume: {workoutVolume} kg</Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Box flexGrow={1}>
                                            <Typography variant="caption">Workout</Typography>

                                                {oneWorkout.exercises.map((oneExercise, index) => {
                                                    return (
                                                        <>

                                                            <Typography key={index} variant="body2">
                                                                {oneExercise.sets.length} sets {oneExercise.exerciseName}
                                                            </Typography>
                                                        </>
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
                            <Card>
                                <CardContent>
                                    <Chart id={id} />
                                </CardContent>
                            </Card>
                        </Box>
                        <Box sx={{ my: 3 }}>
                            {/* Container for Routines */}
                            <Typography variant="h5">Routines</Typography>
                            {routines.length > 0 ? (
                                routines.map((oneRoutine) => {
                                    return (
                                        <Card key={oneRoutine._id} sx={{ my: 3 }}>
                                            <CardContent>
                                                <Typography variant="h7">
                                                    <Link to={'/shapeme/routine/' + oneRoutine._id}>{oneRoutine.routineName}</Link>
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    );
                                })
                            ) : (
                                <Typography variant="body2">No routines found.</Typography>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default TestProfile;
