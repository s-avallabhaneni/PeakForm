const express = require('express');
const router = express.Router();
const workoutsController = require('../controllers/workoutsController');

// Workout routes
router.get('/', workoutsController.getWorkouts);
router.get('/:id', workoutsController.getWorkoutById);
router.post('/', workoutsController.createWorkout);
router.put('/:id', workoutsController.updateWorkout);
router.delete('/:id', workoutsController.deleteWorkout);

module.exports = router;
