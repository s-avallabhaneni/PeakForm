const pool = require('../db');

// Get all workouts
exports.getWorkouts = async (req, res) => {
    try {
        const workouts = await pool.query('SELECT * FROM workouts');
        res.json(workouts.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single workout by ID
exports.getWorkoutById = async (req, res) => {
    const { id } = req.params;
    try {
        const workout = await pool.query('SELECT * FROM workouts WHERE id = $1', [id]);
        if (workout.rows.length === 0) {
            return res.status(404).json({ message: "Workout not found" });
        }
        res.json(workout.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new workout
exports.createWorkout = async (req, res) => {
    const { name, reps } = req.body;
    try {
        const newWorkout = await pool.query(
            'INSERT INTO workouts (name, reps) VALUES ($1, $2) RETURNING *',
            [name, reps]
        );
        res.status(201).json(newWorkout.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an existing workout
exports.updateWorkout = async (req, res) => {
    const { id } = req.params;
    const { name, reps } = req.body;
    try {
        const updatedWorkout = await pool.query(
            'UPDATE workouts SET name = $1, reps = $2 WHERE id = $3 RETURNING *',
            [name, reps, id]
        );
        if (updatedWorkout.rows.length === 0) {
            return res.status(404).json({ message: "Workout not found" });
        }
        res.json(updatedWorkout.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a workout
exports.deleteWorkout = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedWorkout = await pool.query(
            'DELETE FROM workouts WHERE id = $1 RETURNING *',
            [id]
        );
        if (deletedWorkout.rows.length === 0) {
            return res.status(404).json({ message: "Workout not found" });
        }
        res.json({ message: "Workout deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
