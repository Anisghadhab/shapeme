import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const EditRoutine = () => {
    const [routine, setRoutine] = useState(null);
    const [muscle, setMuscle] = useState('');
    const [exerciseSugg, setExerciseSugg] = useState([]);
    const [routineName, setRoutineName] = useState('');
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [apiKey] = useState('CJQqiJtNUltfUAL5DqJvtA==Mby2JjWPZ6eHl6gJ'); // Replace 'YOUR_API_KEY' with your actual API key
    const { id } = useParams();
    const navigate = useNavigate();

    console.log(id);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/routine/${id}`)
            .then((response) => {
                setRoutine(response.data.routine);
            })
            .catch((error) => {
                console.error('Error fetching routine data:', error);
            });
    }, [id]);

    useEffect(() => {
        if (routine) {
            setRoutineName(routine.routineName);
            setSelectedExercises(routine.exercises);
        }
    }, [routine]);

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

    const handleSave = () => {
        const updatedRoutine = {
            routineName: routineName,
            exercises: selectedExercises.map((exercise) => ({
                exerciseName: exercise.exerciseName,
                sets: exercise.sets.map((oneSet) => ({
                    setNumber: oneSet.setNumber,
                    kg: oneSet.kg,
                    reps: oneSet.reps,
                })),
            })),
        };
        console.log(updatedRoutine);
        axios
            .put(`http://localhost:8000/api/routine/update/${id}`, updatedRoutine)
            .then((updatedRoutine) => {
                console.log('Updated Routine:', updatedRoutine);
                navigate('/shapeme/routines');
            })
            .catch((err) => {
                // Handle error if needed
                console.error('Error updating routine:', err);
            });
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
                <form>
                    <Typography variant="h5">Routine Name</Typography>
                    <TextField fullWidth variant="outlined" onChange={(e) => setRoutineName(e.target.value)} value={routineName} />
                </form>
                <div>
                    {selectedExercises.map((exercise, exerciseIndex) => {
                        return (
                            <div key={exerciseIndex}>
                                <Typography variant="h6">{exercise.exerciseName}</Typography>
                                {exercise.sets.map((set, setIndex) => (
                                    <form key={setIndex} style={{ display: 'flex', alignItems: 'center' }}>
                                        <TextField
                                            label="Set"
                                            type="number"
                                            variant="outlined"
                                            value={setIndex + 1}
                                            InputProps={{ readOnly: true }}
                                            style={{ marginRight: '16px' }}
                                        />
                                        <TextField
                                            label="Kg"
                                            type="number"
                                            variant="outlined"
                                            value={set.kg}
                                            required
                                            onChange={(e) =>
                                                setSelectedExercises((prevState) =>
                                                    prevState.map((prevExercise, idx) =>
                                                        idx === exerciseIndex
                                                            ? {
                                                                ...prevExercise,
                                                                sets: prevExercise.sets.map((prevSet, prevSetIndex) =>
                                                                    prevSetIndex === setIndex ? { ...prevSet, kg: e.target.value } : prevSet
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
                                            value={set.reps}
                                            required
                                            onChange={(e) =>
                                                setSelectedExercises((prevState) =>
                                                    prevState.map((prevExercise, idx) =>
                                                        idx === exerciseIndex
                                                            ? {
                                                                ...prevExercise,
                                                                sets: prevExercise.sets.map((prevSet, prevSetIndex) =>
                                                                    prevSetIndex === setIndex ? { ...prevSet, reps: e.target.value } : prevSet
                                                                ),
                                                            }
                                                            : prevExercise
                                                    )
                                                )
                                            }
                                            style={{ marginRight: '16px' }}
                                        />
                                        <Button variant="contained" color="secondary" onClick={() => handleDel(exerciseIndex, setIndex)}>
                                            Delete
                                        </Button>
                                    </form>
                                ))}
                                <Button variant="contained" onClick={() => handleAddSetForExercise(exerciseIndex)}>
                                    Add Set
                                </Button>
                            </div>
                        );
                    })}
                    <Button variant="contained" onClick={handleSave} style={{ marginTop: '16px' }}>
                        Save Routine
                    </Button>
                </div>
            </div>
            <div>
                <form>
                    <Typography variant="h5">Choose Exercise</Typography>
                    <TextField fullWidth variant="outlined" onChange={(e) => setMuscle(e.target.value)} />
                </form>
                <div>
                    {exerciseSugg.map((oneExercise, idx) => {
                        return (
                            <p key={idx}>
                                <Button
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
                                    style={{ margin: '8px' }}
                                >
                                    {oneExercise.name}
                                </Button>
                            </p>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default EditRoutine;
