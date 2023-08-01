import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const Chart = (props) => {
    const [workouts, setWorkouts] = useState([]);
    const [userId, setUserId] = useState()
    const [userName, setUserName] = useState()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/getloggeduser', {
                    withCredentials: true,
                });
                const userData = response.data;
                setUserId(userData._id);
                setUserName(userData.firstName)

                const workoutsResponse = await axios.get('http://localhost:8000/api/workouts', {
                    params: { userId: userId },
                    withCredentials: true,
                });
                setWorkouts(workoutsResponse.data.allWorkouts);
                console.log("workouts", workouts)

            } catch (error) {
                console.log(error);
            }
        };

        fetchUserData();
    }, [userId]);

    const calculateVolume = (exercise) => {
        let totalVolume = 0;
        exercise.sets.forEach((set) => {
            totalVolume += set.kg * set.reps;
        });
        return totalVolume;
    };

    // Calculate the workoutVolume for each workout
    const workoutData = workouts.map((oneWorkout) => ({
        day: new Date(oneWorkout.createdAt).toLocaleDateString(), // Convert the date string to a valid date object and then format it as a string
        kg: oneWorkout.exercises.reduce((acc, exercise) => acc + calculateVolume(exercise), 0),
    }));
    console.log(workoutData)

    return (
        <div>
        <BarChart width={600} height={300} data={workoutData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="kg" fill="#8884d8" />
        </BarChart>
        </div>
    );
};

export default Chart;
