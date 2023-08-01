const mongoose = require('mongoose');

const WorkoutDoneSchema = new mongoose.Schema({

    routineName: {
        type: String,
        trim: true,
    },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    exercises: [
        {
            exerciseName: {
                type: String,
                trim: true,
            },
            sets: [
                {
                    setNumber: {
                        type: Number,
                        default: 1,
                    },
                    kg: {
                        type: Number,
                    },
                    reps: {
                        type: Number,
                    },
                },
            ],
        },
    ],
}, { timestamps: true });

WorkoutDoneSchema.pre('save', function (next) {
    this.exercises.forEach((exercise) => {
        exercise.sets.forEach((set, index) => {
            set.setNumber = index + 1;
        });
    });
    next();
});
const WorkoutDone = mongoose.model("WorkoutDoneSchema", WorkoutDoneSchema);

module.exports = WorkoutDone;
