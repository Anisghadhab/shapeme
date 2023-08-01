import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container, Box, Typography, Grid } from '@mui/material';
import SideNav from './SideNav';

const Routines = (props) => {
    const [routineNumber, setRoutineNumber] = useState(0);
    const [routines, setRoutines] = useState([]);
    const { userId } = props; // Destructure userId from props

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/routines', { params: { userId: userId }, withCredentials: true }) // Pass userId as a query parameter
            .then((response) => {
                const routineArray = response.data.routines;
                setRoutines(routineArray);
                setRoutineNumber(routineArray.length);
            })
            .catch((err) => {
                console.log('There is an error:', err);
            });
    }, [userId]); // Include userId in the dependency array to trigger the effect whenever it changes

    // Implement delete functionality here
    const handleDel = (id) => {
        console.log(id);
        axios
            .delete(`http://localhost:8000/api/routine/delete/${id}`)
            .then((res) => {
                setRoutines(routines.filter((oneRoutine) => oneRoutine._id !== id));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <SideNav />

            <Container mt={6}>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={3}>
                        <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
                            <Button variant="contained" color="primary" style={{ backgroundColor: '#2c3e50' }}>
                                <Link to="/shapeme/routines/new" style={{ color: 'white', textDecoration: 'none' }}>
                                    New Routine
                                </Link>
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <div mt={2}>
                            <TableContainer component={Paper} style={{marginTop: "20px"}}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>My Routines ({routineNumber})</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {routines.map((routine) => (
                                            <TableRow key={routine._id}>
                                                <TableCell>
                                                    <Link to={'/shapeme/routine/' + routine._id} style={{ textDecoration: 'none' }}>
                                                        {routine.routineName}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="contained" style={{ backgroundColor: '#e74c3c' }} color="secondary" onClick={() => handleDel(routine._id)}>
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Routines;
