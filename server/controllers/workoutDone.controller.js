const WorkoutDone = require('../models/workoutDone.model');


// Create One

module.exports.createOneWorkout = (req, res) => {
    WorkoutDone.create(req.body)
        .then((newWorkoutDone) => {
            console.log(newWorkoutDone)
            res.json(newWorkoutDone)
        })
        .catch((err) => {
            res.status(400).json(err ) 
        })
};

//Show all

module.exports.showAllWorkouts = (req, res) => {
    WorkoutDone.find({ userId: req.query.userId})
        .then((allWorkouts) => {
            res.status(200).json({ allWorkouts: allWorkouts })
        })
        .catch((err) => {
            res.json({err })
        });
};

//Show one

module.exports.showOneWorkout = (req, res) => {
    WorkoutDone.findOne({ _id: req.params.id })
        .then((oneWorkout) => {
            console.log({ oneWorkout: oneWorkout })
            res.json({ oneWorkout: oneWorkout })
        })
        .catch((err) => {
            res.json({err })
        });
};

// Delete one

module.exports.deleteOneWorkout = (req, res) => {
    WorkoutDone.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ Workout: result })
        })
        .catch((err) => {
            res.json({err})
        });
};

//Update One

// module.exports.updateOneWorkout = (req, res) => {
//     WorkoutDone.findOneAndUpdate({ _id: req.params.id }, req.body,
//         {new: true, runValidators: true})
//         .then((updatedWorkout) => {
//             res.json({ Workout: updatedWorkout })
//             console.log({ Workout: updatedWorkout})
//         })
//         .catch((err) => {
//             res.status(400).json({err })
//         });
// };