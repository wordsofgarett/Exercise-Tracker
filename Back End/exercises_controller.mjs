/**
 * Garett Foster
 * fostgare@oregonstate.edu
 */

import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.listen(PORT, async () => {
    await exercises.connect()
    console.log(`Server listening on port ${PORT}...`);
});

/**
 * Create a new exercise with the query parameters provided in the body
 * date property must be of form MM-DD-YY
 */
app.post('/exercises', asyncHandler(async (req, res) => {
    const exercise = await exercises.createExercise(req.body.name, 
                        req.body.reps, 
                        req.body.weight,
                        req.body.unit,
                        req.body.date);
    if (exercise === 400) {
        res.status(400).json({Error: "Invalid request"});
    } else {
        res.status(201).json(exercise);
    }
}));

/**
 * Retrieve one exercise by ID
 */
app.get('/exercises/:id', asyncHandler(async (req, res) => {
    const exercise = await exercises.getExerciseByID(req.params.id);
    if (exercise === null) {
        res.status(404).json({Error: "Not found"})
    } else {
        res.status(200).json(exercise);
    }
}))

/**
 * Retrieve many exercises by property match or all exercises
 */
app.get('/exercises', asyncHandler(async (req, res) => {
    const matched_exercises = await exercises.getManyExercises(req.query);
    res.status(200).json(matched_exercises);
}))

/**
 * Update one exercise by ID
 */
app.put('/exercises/:id', asyncHandler(async (req,res) => {
    const exercise = await exercises.updateExercise({_id: req.params.id}, req.body);
    if (exercise === 400) {
        res.status(400).json({Error: "Invalid request"});
    } else if (exercise === 404) {
        res.status(404).json({Error: "Not found"});
    } else {
        res.status(200).json(exercise);
    }
}))

/**
 * Delete one exercise by ID
 */
app.delete('/exercises/:id', asyncHandler(async (req,res) => {
    const result = await exercises.deleteExerciseById(req.params.id);
    if (result === 0) {
        res.status(404).json({Error: "Not found"})
    } else {
        res.status(204).send();
    }
}))