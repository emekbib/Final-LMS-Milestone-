const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema 
const announcementSchema = new mongoose.Schema({
    title:  { type: String, required: true},
    author:  { type: String, required: true},
    body: { type: String, required: true},
});

//use the blueprint to create the model 
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('Announcement', announcementSchema,'Announcements');
//note capital A in the collection name