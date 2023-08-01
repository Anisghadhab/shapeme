const Routine = require('../models/routine.model');


// Create One

module.exports.createOneRoutine = (req, res) => {
    Routine.create(req.body)
        .then((newRoutine) => {
            console.log(newRoutine)
            res.json(newRoutine)
        })
        .catch((err) => {
            res.status(400).json(err ) 
        })
};

//Show all

module.exports.showAllRoutines = (req, res) => {    
    console.log(req.query.userId)
    Routine.find({ userId: req.query.userId}) // Assuming userId field in the Routine schema refers to the user who created the routine
        .then((userRoutines) => {
            res.status(200).json({ routines: userRoutines });
        })
        .catch((err) => {
            res.json({ err });
        });
};

//Show one

module.exports.showOneRoutine = (req, res) => {
    Routine.findOne({ _id: req.params.id })
        .then((oneRoutine) => {
            console.log({ routine: oneRoutine })
            res.json({ routine: oneRoutine })
        })
        .catch((err) => {
            res.json({err })
        });
};

//Delete one

module.exports.deleteOneRoutine = (req, res) => {
    Routine.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ routine: result })
        })
        .catch((err) => {
            res.json({err})
        });
};

//Update One

module.exports.updateOneRoutine = (req, res) => {
    Routine.findOneAndUpdate({ _id: req.params.id }, req.body,
        {new: true, runValidators: true})
        .then((updatedRoutine) => {
            res.json({ routine: updatedRoutine })
            console.log({ routine: updatedRoutine })
        })
        .catch((err) => {
            res.status(400).json({err })
        });
};