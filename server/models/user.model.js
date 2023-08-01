const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// USER SCHEMA =====================================




const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email already exists'],
    validate: {
      validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: 'Please enter a valid email'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be 8 characters or longer']
  },
  gender: {
    type : String,
    enum: ["Male", "Female"]
  },
  age: {
    type: Number,
    // required: [true, "age is required"]
  },
  height: {
    type: Number,
    // required: [true, "height is required"]
  },
  weight: {
    type: Number,
    // required: [true, "weight is required"]
  },
  fitnessLevel: {
    type: String,
    // required: [true, "fitness level is required"]
  },
  goal: {
    type: String,
    // required: [true, "choose your goal physic"]
  },
  trainPerWeek: {
    type: Number,
    // required: [true, "choose how often can you train per week"]
  },
  routines:{type: mongoose.Schema.Types.ObjectId, ref: 'RoutineSchema'}, // Use Routine.schema to specify the subdocument structure
  workoutDone :{type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutDoneSchema'},
  post:[{ type: mongoose.Types.ObjectId, ref: "Post" }],

}, { timestamps: true });


UserSchema.virtual('confirmPassword')
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });

UserSchema.pre('validate', function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
  }
  next();
});

UserSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;




