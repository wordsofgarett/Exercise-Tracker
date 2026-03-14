/**
 * Garett Foster
 * fostgare@oregonstate.edu
 */

import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_DB_NAME = 'exercises_db';

let connection = undefined;

/**
 * Connect to the server
 */
async function connect(){
    try{
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: EXERCISE_DB_NAME});
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

/**
 * Create and compile exercise schema 
 */
const exerciseSchema = mongoose.Schema({
    name: {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: {type: String, required: true},
    date: {type: String, required: true}
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

/**
 * Date input validation
 * @param {String} date
 * Returns true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

function validateInput(name, reps, weight, unit, date) {
    const validUnits = ["lbs","kgs"];
    if (typeof(name) !== 'string') {return false;}
    if (typeof(reps) !== 'number' || reps <= 0) {return false;}
    if (typeof(weight) !== 'number' || weight <= 0) {return false;}
    if (validUnits.includes(unit) === false) {return false;}
    if (isDateValid(date) === false) {return false;}
    return true;
}

/**
 * Create new exercise
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. 
 * Resolves to the JSON object for the document created by calling save.
 */
const createExercise = async (name, reps, weight, unit, date) => {
    if (validateInput(name, reps, weight, unit, date)) {
            const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
            return exercise.save();
    } else {
        return 400; 
    }
}

/**
 * Get one by id
 * @param {String} id
 * @returns A prommise. 
 * Resolves to JSON object if user is found.
 */
const getExerciseByID = async (id) => {
    const query = Exercise.findById(id);
    return query.exec();
}

/**
 * Get several exercises by property - intended for name and/or date.
 * Retrieves all exercises if no filters are provided.
 * @param {String} name Optional
 * @param {String} date Optional
 * @returns A promise. 
 * Resolves to array of JSON objects with matching properties, even if none exist.
 */
const getManyExercises = async(filter) => {
    const query = Exercise.find(filter);
    return query.exec();
}

/**
 * Edit one by id
 * @param {String} id
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. 
 * Resolves to number 400 if date input is invalid.
 * Resolves to number 404 if exercise is not found.
 * Resolves JSON object of updated exercise otherwise.
 */
const updateExercise = async (id, updates) => {
    if (validateInput(updates.name, updates.reps, updates.weight, updates.unit, updates.date)) {
        const result = await Exercise.updateOne(id, updates).exec();
            if (result.matchedCount === 0) {
                return 404;
            } else {
                return getExerciseByID(id);
            };
    } else {
        return 400; 
    }
    
}

/**
 * Delete one exercise by id
 * @param {String} id 
 * @returns A promise. 
 * Resolves to a empty body if exercise id is found and deleted; otherwise, returns number 404.
 */
const deleteExerciseById = async (id) => {
    const result = await Exercise.deleteOne({_id: id});
    return result.deletedCount;
}

export { connect, createExercise, getExerciseByID, getManyExercises, updateExercise, deleteExerciseById};