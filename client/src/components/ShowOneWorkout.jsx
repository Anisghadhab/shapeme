import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import SideNav from './SideNav';
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Container,
} from '@mui/material';

const ShowOneWorkout = () => {
    const [workout, setWorkout] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/workout/${id}`)
            .then((response) => {
                setWorkout(response.data.oneWorkout);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    return (
        <Container>
                        <SideNav />

            <Typography variant="h3" gutterBottom>
                {workout.routineName}
            </Typography>
            {workout.exercises &&
                workout.exercises.map((oneExercise) => (
                    <div key={oneExercise._id}>
                        <Typography variant="h5" gutterBottom>
                            {oneExercise.exerciseName}
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>SETS</TableCell>
                                        <TableCell>WEIGHT & REPS</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {oneExercise.sets &&
                                        oneExercise.sets.map((set) => (
                                            <TableRow key={set._id}>
                                                <TableCell>{set.setNumber}</TableCell>
                                                <TableCell>{set.kg} kg x {set.reps}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                ))}
        </Container>
    );
};

export default ShowOneWorkout;
