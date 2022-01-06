
const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema 
const contentSchema = new mongoose.Schema({
    Title: { type: String, required: true},
    Content: { type: String, required: true},
    Description: { type: String},
    Attachment: { type: String},
});

//use the blueprint to create the model 
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('Content', contentSchema, 'Content');
// module.exports = mongoose.model('Student', studentSchema, 'Students');
//note capital S in the collection name

                    