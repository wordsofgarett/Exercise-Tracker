import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as resources from './resources_model.mjs';

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.listen(PORT, async () => {
    await resources.connect()
    console.log(`Server listening on port ${PORT}...`);
});

/**
 * Create a new resource with the query parameters provided in the body
 * date property must be of form MM-DD-YY
 */
app.post('/resources', asyncHandler(async (req, res) => {
    const resource = await resources.createExercise(req.body.title, 
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
    const resource = await resources.getExerciseByID(req.params.id);
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
    const matched_resources = await resources.getManyExercises(req.query);
    res.status(200).json(matched_resources);
}))

/**
 * Update one resource by ID
 */
app.put('/resources/:id', asyncHandler(async (req,res) => {
    const resource = await resources.updateExercise({_id: req.params.id}, req.body);
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
    const result = await resources.deleteExerciseById(req.params.id);
    if (result === 0) {
        res.status(404).json({Error: "Not found"})
    } else {
        res.status(204).send();
    }
}))