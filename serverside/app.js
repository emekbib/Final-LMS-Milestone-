
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');
//specify where to find the schema
// const Student = require('./models/student')
const Content = require('./models/content')
const Announcement = require('./models/announcement')
const Project = require('./models/projects')
//connect and display the status 
// mongoose.connect('mongodb://localhost:27017/LMS', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect('mongodb+srv://it2603lms:znr-xak_VZW.fpx6edm@lms.qxjjo.mongodb.net/LMS?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("connected"); })
    .catch(() => { console.log("error connecting"); });

//specify which domains can make requests and which methods are allowed
app.use((req, res, next) => {
    console.log('This line is always called');
    res.setHeader('Access-Control-Allow-Origin', '*'); //can connect from any host
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); //allowable methods
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});
//parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

//parse application/json
app.use(express.json())





    // ANNOUNCEMENTS Section Below

    //in the app.get() method below we add a path for the announcements form API 
    //by adding /lms, we tell the server that this method will be called every time http://localhost:8000/announcements is requested. 
    app.get('/announcements', (req, res, next) => {
        //call mongoose method find (MongoDB db.Announcements.find())
        Announcement.find()
            //if data is returned, send data as a response 
            .then(data => res.status(200).json(data))
            //if error, send internal server error
            .catch(err => {
                console.log('Error: ${err}');
                res.status(500).json(err);
            });

    });

    //serve incoming post requests to /announcements
    app.post('/announcements', (req, res, next) => {
        // create a new student variable and save request’s fields 
        const announcement = new Announcement({
            title: req.body.title,
            author: req.body.author,
            body: req.body.body,
        });
        //send the document to the database 
        announcement.save()
            //in case of success
            .then(() => { console.log('Success'); })
            //if error
            .catch(err => { console.log('Error:' + err); });
    });

    //:id is a dynamic parameter that will be extracted from the URL
    app.delete("/announcements/:id", (req, res, next) => {
        Announcement.deleteOne({ _id: req.params.id }).then(result => {
            console.log(result);
            res.status(200).json("Deleted!");
        });
    });


    //serve incoming put requests to /projects
    app.put('/announcements/:id', (req, res, next) => {
        console.log("id: " + req.params.id)
        // check that the parameter id is valid 
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            //find a document and set new data fields 
            Announcement.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $set: {
                        title: req.body.title,
                        author: req.body.author,
                        body: req.body.body,
                    }
                },
                { new: true }
            )
                .then((announcement) => {
                    if (announcement) { //what was updated 
                        console.log(announcement);
                    } else {
                        console.log("no data exist for this id");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            console.log("please provide correct id");
        }
    });

    //find a student based on the id
    app.get('/announcements/:id', (req, res, next) => {
        //call mongoose method findOne (MongoDB db.Announcements.findOne())
        Announcement.findOne({ _id: req.params.id })
            //if data is returned, send data as a response 
            .then(data => {
                res.status(200).json(data)
                console.log(data);
            })
            //if error, send internal server error
            .catch(err => {
                console.log('Error: ${err}');
                res.status(500).json(err);
            });
    });



    // PROJECTS Section Below

    //in the app.get() method below we add a path for the students API 
    //by adding /students, we tell the server that this method will be called every time http://localhost:8000/students is requested. 
    app.get('/projects', (req, res, next) => {
        //call mongoose method find (MongoDB db.Students.find())
        Project.find()
            //if data is returned, send data as a response 
            .then(data => res.status(200).json(data))
            //if error, send internal server error
            .catch(err => {
                console.log('Error: ${err}');
                res.status(500).json(err);
            });

    });

    //serve incoming post requests to /students
    app.post('/projects', (req, res, next) => {
        // create a new student variable and save request’s fields 
        const project = new Project({
            Lab1: req.body.Lab1,
            Lab2: req.body.Lab2,
            Comments1: req.body.Comments1,
            Comments2: req.body.Comments2
        });
        //send the document to the database 
        project.save()
            //in case of success
            .then(() => { console.log('Success'); })
            //if error
            .catch(err => { console.log('Error:' + err); });
    });
    //:id is a dynamic parameter that will be extracted from the URL
    app.delete("/projects/:id", (req, res, next) => {
        Project.deleteOne({ _id: req.params.id }).then(result => {
            console.log(result);
            res.status(200).json("Deleted!");
        });
    });
    //serve incoming put requests to /students 
    app.put('/projects/:id', (req, res, next) => {
        console.log("id: " + req.params.id)
        // check that the parameter id is valid 
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            //find a document and set new first and last names 
            Project.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $set: {
                        Lab1: req.body.Lab1,
                        Lab2: req.body.Lab2,
                        Comments1: req.body.Comments1,
                        Comments2: req.body.Comments2
                    }
                },
                { new: true }
            )
                .then((project) => {
                    if (project) { //what was updated 
                        console.log(project);
                    } else {
                        console.log("no data exist for this id");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            console.log("please provide correct id");
        }
    });
    //find a student based on the id
    app.get('/projects/:id', (req, res, next) => {
        //call mongoose method findOne (MongoDB db.Students.findOne())
        Project.findOne({ _id: req.params.id })
            //if data is returned, send data as a response 
            .then(data => {
                res.status(200).json(data)
                console.log(data);
            })
            //if error, send internal server error
            .catch(err => {
                console.log('Error: ${err}');
                res.status(500).json(err);
            });
    });




// CONTENTS Section Below

//in the app.get() method below we add a path for the students API 
//by adding /students, we tell the server that this method will be called every time http://localhost:8000/students is requested.
// app.get('/students', (req, res, next) => {
//by adding /projects, we tell the server that this method will be called every time http://localhost:8000/projects is requested. 
//by adding /contents, we tell the server that this method will be called every time http://localhost:8000/contents is requested. 
app.get('/contents', (req, res, next) => {
    //call mongoose method find (MongoDB db.Students.find())
    Content.find()
        //if data is returned, send data as a response 
        .then(data => res.status(200).json(data))
        //if error, send internal server error
        .catch(err => {
            console.log('Error: ${err}');
            res.status(500).json(err);
        });
});


//find a student based on the id
// app.get('/students/:id', (req, res, next) => {
app.get('/contents/:id', (req, res, next) => {
    //call mongoose method findOne (MongoDB db.Students.findOne())
    Content.findOne({ _id: req.params.id })
        //if data is returned, send data as a response 
        .then(data => {
            res.status(200).json(data)
            console.log(data);
        })
        //if error, send internal server error
        .catch(err => {
            console.log('Error: ${err}');
            res.status(500).json(err);
        });
});


//:id is a dynamic parameter that will be extracted from the URL
app.delete("/contents/:id", (req, res, next) => {
    Content.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
});


//serve incoming put requests to /students 
app.put('/contents/:id', (req, res, next) => {
    console.log("id: " + req.params.id)
    // check that the parameter id is valid 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        //find a document and set new first and last names 
        Content.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    Title: req.body.Title,
                    Content: req.body.Content,
                    Description: req.body.Description,
                    Attachment: req.body.Attachment
                }
            },
            { new: true }
        )
            .then((content) => {
                if (content) { //what was updated 
                    console.log(content);
                } else {
                    console.log("no data exist for this id");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        console.log("please provide correct id");
    }
});


//serve incoming post requests to /students
app.post('/contents', (req, res, next) => {
    // create a new student variable and save request’s fields 
    const content = new Content({
        Title: req.body.Title,
        Content: req.body.Content,
        Description: req.body.Description,
        Attachment: req.body.Attachment
    });
    //send the document to the database 
    content.save()
        //in case of success
        .then(() => { console.log('Success'); })
        //if error
        .catch(err => { console.log('Error:' + err); });
    });


    /* 
            //serve incoming post requests to /students
        app.post('/students', (req, res, next) => {
            const student = req.body;
            console.log(student.ContactName + " " + student.ContactJobTitle + " " + student.ContactEmail + " " + student.ContactPhone + " " +
                student.OrgName + " " + student.OrgAddress + " " + student.OrgWebsite + " " + student.ProjectTitle + " " +
                student.ProjectDescription + " " + student.TechSkills + " " + student.Duties + " " + student.Benefit + " " +
                student.CompanyProvide + " " + student.firstName + " " + student.lastName + " " + student.street + " " +
                student.city + " " + student.state + " " + student.EnteredZip);
            //sent an acknowledgment back to caller 
            res.status(201).json('Post successful');
        
        
        
        //serve incoming post requests to /students
        app.post('/students', (req, res, next) => {
            const student = req.body;
            console.log(student.firstName + " " + student.lastName);
            //sent an acknowledgment back to caller
            res.status(201).json('Post successful');
        });
        
        */


//to use this middleware in other parts of the application
module.exports = app;



