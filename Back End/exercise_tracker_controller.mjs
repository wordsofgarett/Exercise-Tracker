import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';
import * as resources from './resources_model.mjs'

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

/**
 * Create a new resource with the query parameters provided in the body
 */
app.post('/resources', asyncHandler(async (req, res) => {
    const resource = await resources.createResource(req.body.title, 
                        req.body.url, 
                        req.body.source,
                        req.body.dateAdded);
    if (resource === 400) {
        res.status(400).json({Error: "Invalid request"});
    } else {
        res.status(201).json(resource);
    }
}));

/**
 * Retrieve one resource by ID
 */
app.get('/resources/:id', asyncHandler(async (req, res) => {
    const resource = await resources.getResourceByID(req.params.id);
    if (resource === null) {
        res.status(404).json({Error: "Not found"})
    } else {
        res.status(200).json(resource);
    }
}))

/**
 * Retrieve many resources by property match or all resources
 */
app.get('/resources', asyncHandler(async (req, res) => {
    const matched_resources = await resources.getManyResources(req.query);
    res.status(200).json(matched_resources);
}))

/**
 * Update one resource by ID
 */
app.put('/resources/:id', asyncHandler(async (req,res) => {
    const resource = await resources.updateResource({_id: req.params.id}, req.body);
    if (resource === 400) {
        res.status(400).json({Error: "Invalid request"});
    } else if (resource === 404) {
        res.status(404).json({Error: "Not found"});
    } else {
        res.status(200).json(resource);
    }
}))

/**
 * Delete one resource by ID
 */
app.delete('/resources/:id', asyncHandler(async (req,res) => {
    const result = await resources.deleteResourceById(req.params.id);
    if (result === 0) {
        res.status(404).json({Error: "Not found"})
    } else {
        res.status(204).send();
    }
}))