//add dependancies
const notes = require('express').Router();
const fs = require('fs');
const uniqid = require('uniqid');

//Get route for retrieving stored notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received to retrieve stored notes`);
    
    fs.readFile('./db/db.json', (error, data) => {
        const notesData = JSON.parse(data);
        console.log(notesData);

         if (error) {
            throw error;
         } else {

            res.json(JSON.parse(data));

         }
        })              
  });