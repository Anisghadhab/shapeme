const mongoose = require('mongoose');

const RoutineSchema = new mongoose.Schema({

  routineName: {
    type: String,
    required: [true, "{PATH} must be present"],
    maxlength: [20, "{PATH} must be at least 20 chars"],
    trim: true,
  },
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  exercises: [
    {
      exerciseName: {
        type: String,
        required: [true, "{PATH} is required."],
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
            required: [true, "{PATH} must be present"],
          },
          reps: {
            type: Number,
            required: [true, "{PATH} must be present"],
          },
        },
      ],
    },
  ],
}, { timestamps: true });

RoutineSchema.pre('save', function (next) {
  this.exercises.forEach((exercise) => {
    exercise.sets.forEach((set, index) => {
      set.setNumber = index + 1;
    });
  });
  next();
});
const Routine = mongoose.model("RoutineSchema", RoutineSchema);

module.exports = Routine;
