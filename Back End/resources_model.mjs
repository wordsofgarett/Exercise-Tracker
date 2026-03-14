import mongoose from 'mongoose';
import 'dotenv/config';

const RESOURCE_DB_NAME = 'resources_db';

let connection = undefined;

/**
 * Connect to the server
 */
async function connect(){
    try{
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: RESOURCE_DB_NAME});
        console.log("Successfully connected to MongoDB");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

/**
 * Create and compile resource schema 
 */
const resourceSchema = mongoose.Schema({
    title: {type: String, required: true},
    url: {type: String, required: true},
    source: {type: String, required: false},
    dateAdded: {type: String, required: false}
});

const Resource = mongoose.model("Resource", resourceSchema);

function validateInput(title, url) {
    if (typeof(title) !== 'string') {return false;}
    if (typeof(url) !== 'string') {return false;}
    return true;
}

/**
 * Create new resource
 * @param {String} title
 * @param {String} url
 * @param {String} source
 * @param {String} dateAdded
 * @returns A promise. 
 * Resolves to the JSON object for the document created by calling save.
 */
const createResource = async (title, url, source = "source", dateAdded = "date") => {
    if (validateInput(title, url)) {
            const resource = new Resource({title: title, url: url, source: source, dateAdded: dateAdded});
            return resource.save();
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
const getResourceByID = async (id) => {
    const query = Resource.findById(id);
    return query.exec();
}

/**
 * Get several resources by property - intended for name and/or date.
 * Retrieves all resources if no filters are provided.
 * @param {String} name Optional
 * @param {String} date Optional
 * @returns A promise. 
 * Resolves to array of JSON objects with matching properties, even if none exist.
 */
const getManyResources = async(filter) => {
    const query = Resource.find(filter);
    return query.exec();
}

/**
 * Edit one by id
 * @param {String} id
 * @param {String} title
 * @param {String} url
 * @param {String} source
 * @param {String} dateAdded
 * @returns A promise. 
 * Resolves to number 400 if input is invalid.
 * Resolves to number 404 if resource is not found.
 * Resolves JSON object of updated resource otherwise.
 */
const updateResource = async (id, updates) => {
    if (validateInput(updates.title, updates.url)) {
        const result = await Resource.updateOne(id, updates).exec();
            if (result.matchedCount === 0) {
                return 404;
            } else {
                return getResourceByID(id);
            };
    } else {
        return 400; 
    }
    
}

/**
 * Delete one resource by id
 * @param {String} id 
 * @returns A promise. 
 * Resolves to a empty body if resource id is found and deleted; otherwise, returns number 404.
 */
const deleteResourceById = async (id) => {
    const result = await Resource.deleteOne({_id: id});
    return result.deletedCount;
}

export { connect, createResource, getResourceByID, getManyResources, updateResource, deleteResourceById};