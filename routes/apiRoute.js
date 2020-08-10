const router = require("express").Router();
const store = require("../db/store");

// Calling on the function getNotes in class store 
router.get("/notes", function (req, res) {
    store
        .getNotes()

        //Then we are taking the notes and returning them in json format 
        .then(notes => res.json(notes))
        // Catching any errors and returning the response in json
        .catch(err => res.status(500).json(err));
})

// Posting using the function addNote from Class store requesting requiring the body of what was entered
router.post("/notes", function (req, res) {
    store
        .addNote(req.body)

        // Adding the note in json 
        .then(notes => res.json(notes))

        // Catching any errors and returning the response in json
        .catch(err => res.status(500).json(err));
})

// Calling on the function removeNote from store class parameters are the Id of the note to be removed 
router.delete("/notes/:id", function (req, res) {
    store
        .removeNote(req.params.id)
        
        // Returning json response based off a value of true for the Id
        .then(() => res.json({ok: true}))
        
        // Catching any errors and returning the response in json
        .catch(err => res.status(500).json(err));
})


module.exports = router;