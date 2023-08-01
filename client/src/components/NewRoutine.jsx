import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideNav from './SideNav';
import {
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Container,
    Grid,
    Card,
    CardContent,
} from '@mui/material';

const NewRoutine = (props) => {
    
    const [muscle, setMuscle] = useState('');
    const [userId, setUserId] = useState(props.userId)
    const [exerciseSugg, setExerciseSugg] = useState([]);
    const [routineName, setRoutineName] = useState('');
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [apiKey] = useState('CJQqiJtNUltfUAL5DqJvtA==Mby2JjWPZ6eHl6gJ'); // Replace 'YOUR_API_KEY' with your actual API key
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
                headers: {
                    'X-Api-Key': apiKey,
                },
            })
            .then((response) => {
                setExerciseSugg(response.data);
                console.log(response);
            })
            .catch((error) => {
                console.error('Error fetching exercises:', error);
            });
    }, [muscle]);

    const handleAddSetForExercise = (exerciseIndex) => {
        setSelectedExercises((prevState) =>
            prevState.map((exercise, idx) =>
                idx === exerciseIndex
                    ? {
                        ...exercise,
                        sets: [...exercise.sets, { set: exercise.sets.length + 1, kg: 0, reps: 0 }],
                    }
                    : exercise
            )
        );
    };

    const handleRoutine = () => {
        const newRoutine = {
            routineName: routineName,
            userId: userId,
            exercises: selectedExercises.map((exercise) => {
                return {
                    exerciseName: exercise.exerciseName,
                    sets: exercise.sets.map((oneSet) => ({
                        setNumber: oneSet.set,
                        kg: oneSet.kg,
                        reps: oneSet.reps,
                    })),
                };
            }),
        };
        console.log(newRoutine)
        axios
            .post('http://localhost:8000/api/routine/new', newRoutine)
            .then((oneRoutine) => {
                console.log('', oneRoutine);
                navigate('/shapeme/routines');
                // Add any success notification or redirect to the routine page here
            })
            .catch((err) => {
                // Handle error if needed
            });
    };

    const handleDel = (exerciseIndex, setIndex) => {
        setSelectedExercises((prevState) =>
            prevState.map((exercise, idx) =>
                idx === exerciseIndex
                    ? {
                        ...exercise,
                        sets: exercise.sets.filter((_, sIdx) => sIdx !== setIndex),
                    }
                    : exercise
            )
        );
    };

    return (
        <div>
            <SideNav />
            <Container mt={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5">New Routine</Typography>
                        <form>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Routine Name"
                                onChange={(e) => setRoutineName(e.target.value)}
                                value={routineName}
                                sx={{ mb: 2 }}
                            />
                        </form>
                        {selectedExercises.map((exercise, exerciseIndex) => {
                            return (
                                <Card key={exerciseIndex} sx={{ mb: 2 }}>
                                    <CardContent>
                                        <Typography variant="h6">{exercise.exerciseName}</Typography>
                                        {exercise.sets.map((set, setIndex) => (
                                            <form key={setIndex} style={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <TextField
                                                    label="Set"
                                                    type="number"
                                                    variant="outlined"
                                                    value={set.set}
                                                    InputProps={{ readOnly: true }}
                                                    style={{ marginRight: '16px' }}
                                                />
                                                <TextField
                                                    label="Kg"
                                                    type="number"
                                                    variant="outlined"
                                                    required
                                                    onChange={(e) =>
                                                        setSelectedExercises((prevState) =>
                                                            prevState.map((prevExercise, idx) =>
                                                                idx === exerciseIndex
                                                                    ? {
                                                                        ...prevExercise,
                                                                        sets: prevExercise.sets.map((prevSet, prevSetIndex) =>
                                                                            prevSetIndex === setIndex
                                                                                ? { ...prevSet, kg: e.target.value }
                                                                                : prevSet
                                                                        ),
                                                                    }
                                                                    : prevExercise
                                                            )
                                                        )
                                                    }
                                                    style={{ marginRight: '16px' }}
                                                />
                                                <TextField
                                                    label="Reps"
                                                    type="number"
                                                    variant="outlined"
                                                    required
                                                    onChange={(e) =>
                                                        setSelectedExercises((prevState) =>
                                                            prevState.map((prevExercise, idx) =>
                                                                idx === exerciseIndex
                                                                    ? {
                                                                        ...prevExercise,
                                                                        sets: prevExercise.sets.map((prevSet, prevSetIndex) =>
                                                                            prevSetIndex === setIndex
                                                                                ? { ...prevSet, reps: e.target.value }
                                                                                : prevSet
                                                                        ),
                                                                    }
                                                                    : prevExercise
                                                            )
                                                        )
                                                    }
                                                    style={{ marginRight: '16px' }}
                                                />
                                                <Button style={{ backgroundColor: 'red' }} variant="contained" color="secondary" onClick={() => handleDel(exerciseIndex, setIndex)}>
                                                    Delete
                                                </Button>
                                            </form>
                                        ))}
                                        <Button variant="contained" onClick={() => handleAddSetForExercise(exerciseIndex)}>
                                            Add Set
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                        {selectedExercises.length > 0 && (
                            <Button variant="contained" onClick={handleRoutine}>
                                Add Routine
                            </Button>
                        )}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5">Choose Exercise</Typography>
                        <form>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Muscle"
                                onChange={(e) => setMuscle(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                        </form>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            {exerciseSugg.map((oneExercise, idx) => (
                                <Button
                                    key={idx}
                                    variant="outlined"
                                    onClick={() =>
                                        setSelectedExercises((prevState) => [
                                            ...prevState,
                                            {
                                                exerciseName: oneExercise.name,
                                                sets: [{ set: 1, kg: 0, reps: 0 }],
                                            },
                                        ])
                                    }
                                    sx={{ m: 1 }}
                                >
                                    {oneExercise.name}
                                </Button>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default NewRoutine;
