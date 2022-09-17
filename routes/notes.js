//add dependancies
const notes = require('express').Router();
const fs = require('fs');
const uniqid = require('uniqid'); //provides unique id

//Get route for retrieving stored notes from database
notes.get('/', (req, res) => {
    console.info(`${req.method} request received to retrieve stored notes`);
    //Read db file from db file, convert to JSON format
    fs.readFile('./db/db.json', (error, data) => {
        (error)? console.error(error) : res.json(JSON.parse(data));
         
    })              
});

//Post request to add a new note to the notes db
notes.post('/', (req, res) => {    
   //Log post request received
   console.info(`${req.method} request to store data received`);

   //Access user submitted data - use destructuring to get data in req.body
   const { title, text } = req.body;
   //check that all required properties are included in req.body
   if (title && text) {
       //create new note object
       const newNote = {
           title,
           text,
           id: uniqid(), //add unique user_id
       };    
       
       //get existing notes from db file
       fs.readFile('./db/db.json', 'utf8',  (error, data) =>{
           if(error) {
               console.info(error)
           } else {
               //convert string to json object
               const parsedNotes = JSON.parse(data);
               //for testing
               console.log(parsedNotes);

               //add new note to db: push the new note to the existing notes in parsedNotes array
               parsedNotes.push(newNote);

               //write updated notes object to the db file, strigify to store in file
                   fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 4), (writeErr) =>
                       writeErr
                           ?console.error(writeErr)
                           :console.info('Successfully updated notes db!')
                   );

           }
       });
       //respond to client with success status and new note object
       res.status(201).json(newNote);
   } else {
       //respond with error message
       res.json('Error in posting review');
   }
});


//Request to delete entry from the db file
notes.delete('/:id', (req, res) => {    
   //Log post request received
   console.info(`${req.method} request received to delete note entry with id:${req.params.id}`);  


   fs.readFile('./db/db.json', 'utf8',  (err, data) =>{
      if(err) {
          console.info(err)
      } else {
          //convert string to json object
          const parsedNotes = JSON.parse(data);
          //for testing
          console.log(parsedNotes);

          /*remove note from db: use the filter arrays calllback funtion to return an array of objects whose
         id property is not equal to the id of the note the user wants to delete*/
         const newArr = parsedNotes.filter(note => note.id !== req.params.id);
         console.log(newArr);  
         //write updated notes object to the db file return an error if unsuccessful
         fs.writeFile('./db/db.json', JSON.stringify(newArr, null, 4), (writeErr) =>
            writeErr ? console.error(writeErr) : res.status(201).json(newArr) );
           
      }
  });   
   
});

  module.exports = notes;