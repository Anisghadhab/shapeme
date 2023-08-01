const UserController = require('../controllers/user.controllers');
const { authenticate } = require('../config/jwt.config');
const RoutineController = require('../controllers/routine.controller');
const WorkoutDoneController = require('../controllers/workoutDone.controller')
module.exports = (app) => {
    app.post('/api/register', UserController.register);
    app.post('/api/login', UserController.login);
    app.post('/api/logout', UserController.logout);
    app.get("/api/getUserById/:id", UserController.getUserById);
    app.get('/allusers/:id', UserController.getAllUsers)
    app.get('/api/getloggeduser', UserController.getLoggedUser)

    app.post('/api/routine/new', RoutineController.createOneRoutine);
    app.get('/api/routines', authenticate, RoutineController.showAllRoutines);
    // app.get('/api/routines', RoutineController.showAllRoutines);
    app.get('/api/routine/:id', RoutineController.showOneRoutine);
    app.put('/api/routine/update/:id', RoutineController.updateOneRoutine);
    app.delete('/api/routine/delete/:id', RoutineController.deleteOneRoutine);

    app.post('/api/workout/new', WorkoutDoneController.createOneWorkout);
    app.get('/api/workouts', authenticate, WorkoutDoneController.showAllWorkouts);
    app.get('/api/workout/:id', WorkoutDoneController.showOneWorkout);
    app.delete('/api/workout/delete/:id', WorkoutDoneController.deleteOneWorkout);



}
