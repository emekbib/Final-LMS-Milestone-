const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema 
const projectSchema = new mongoose.Schema({
    Lab1:  { type: String, required: true},
    Lab2:  { type: String, required: true},
    Comments1: {type: String, required: true },
    Comments2: {type: String, required: true }
});

//use the blueprint to create the model 
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('projects', projectSchema,'Assignments');
//note capital S in the collection name
