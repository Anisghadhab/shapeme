import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../assets/css/OneRoutine.css'
import SideNav from './SideNav';
const ShowOneRoutine = (props) => {
  const [routine, setRoutine] = useState({ exercises: [] });
  const { id } = useParams();
  const [userId, setUserId] = useState(props.userId);
  const [isCompleted, setIsCompleted] = useState(false); // State variable for the completed button
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/routine/${id}`)
      .then((response) => {
        console.log(response.data.routine);
        setRoutine(response.data.routine);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleCompletedRoutine = () => {
    const completedWorkout = {
      routineName: routine.routineName,
      exercises: routine.exercises.map((exercise) => ({
        exerciseName: exercise.exerciseName,
        sets: exercise.sets.map((set) => ({ reps: set.reps, kg: set.kg })),
      })),
      userId: userId,
    };

    axios
      .post('http://localhost:8000/api/workout/new', completedWorkout)
      .then((response) => {
        console.log(response.data);
        // Handle successful response here, e.g., show a success message to the user.
        setIsCompleted(true); // Update the state to mark the button as completed
        // navigate('/shapeme/profile');
      })
      .catch((err) => {
        console.log(err);
        // Handle the error, e.g., show an error message to the user.
      });
  };

  return (
    <div>
                  <SideNav />

      {routine ? (
        <>
          <Typography variant="h4">{routine.routineName}</Typography>
          <Typography variant="h5">Exercises</Typography>
          {routine.exercises.map((exercise, index) => (
            <Paper key={index} sx={{ padding: '16px', marginBottom: '16px' }}>
              <Typography variant="h6">{exercise.exerciseName}</Typography>
              <Typography>Sets: {exercise.sets.length}</Typography>
              <Typography>
                Reps: {exercise.sets[0].reps}-{exercise.sets[exercise.sets.length - 1].reps}
              </Typography>
            </Paper>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
      <Button
        component={Link}
        to={`/shapeme/edit-routine/${id}`}
        variant="contained"
        sx={{ marginRight: '16px' }}
      >
        Edit
      </Button>
      <Button
        onClick={handleCompletedRoutine}
        variant="contained"
        sx={{
          backgroundColor: isCompleted ? 'green' : 'default',
          '&:hover': {
            backgroundColor: isCompleted ? 'green' : '#f50057', // Change the hover color when completed
          },
        }}
      >
        {isCompleted ? 'Completed workout 👍' : 'Workout Done'}
      </Button>
    </div>
  );
};

export default ShowOneRoutine;
