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


  notes.post('/', (req, res) => {    
   //Log post request received
   console.info(`${req.method} request to store data received`);

   //Access user submitted data - use destructuring to get data in req.body
   const { title, text } = req.body;
   //check that all required properties are included in req.body
   if (title && text) {
       //create new not object
       const newNote = {
           title,
           text,
           id: uniqid(), //if true add user_id
       };    
       
       //get existing notes - fs.readfile
       fs.readFile('./db/db.json', 'utf8',  (err, data) =>{
           if(err) {
               console.info(err)
           } else {
               //convert string to json object
               const parsedNotes = JSON.parse(data);
               //for testing
               console.log(parsedNotes);

               //add new note to db -push the new note to the json array
               parsedNotes.push(newNote);

               //write updated notes object to the db file
                   fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 4), (writeErr) =>
                       writeErr
                           ?console.error(writeErr)
                           :console.info('Successfully update notes db!')
                   );

           }
       });

      const response = {
         status: 'success',
         body: newReview,
       };
         
      console.log(response);
      res.status(201).json(response);
   } else {
       //respond with error message
       res.status(500).json('Error in posting review');
   }
});

notes.delete('/:id', (req, res) => {    
   //Log post request received
   console.info(`${req.method} request to delete note entry ${req.params.id}`);    
   const id = req.params.id;
   console.log(`the note to delete has id: ${id}`);
   
});

  module.exports = notes;