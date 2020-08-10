const util = require("util");
const fs = require("fs");
// this is an npm install that allows assigning of ids to help with deleting the selected notes
const uuidv1 = require("uuidv1");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const storeFile = "db/db.json"

class Store {
    // Reading the notes from db.json
    readNotes() {
        return readFileAsync(storeFile, "utf8");
    }

    // Writing the saved notes to db.json
    writeNotes(notes) {
        return writeFileAsync(storeFile, JSON.stringify(notes));
    }

    // Retrieves the note information from the JSON file
    getNotes() {

        // Calling Note to be read from the existing note array
        return this.readNotes().then((notes) => {
            let existingNotes = [];

            //  Tring to parse the note into a string
            try {
                existingNotes = JSON.parse(notes);

            // If there is an error it will catch it and return it to the console for me to see
            } catch (err) {
                console.log("error" + err)


            //    Finally it will return the existing notes
            } finally {
                return existingNotes;
            }
        });
    }

    // This will be how we add a note
    addNote(note) {

        // This sets the parameters of the note note.title note.text 
        const {title,text} = note;
        
        // This validates if it contains a text and title and requires it to be true
        if (!title || !text) {
            throw error("Note cannot be blank");
        }
        // Creating the new Note with a new third parameter Id which will be set by the uuidv1 package
        const addedNote = {title,text,id: uuidv1()};

        // Returning the note from get notes will take the value of notes and create the new updated Note
        return this.getNotes()
            // Taking the parameters of notes and adding them to addedNote 
            .then((notes) => [...notes, addedNote])

            //This will take the updated note and return the new Note 
            .then((updatedNotes) => this.writeNotes(updatedNotes))
            .then(() => addedNote);
    }

    // Removing a note
    removeNote(noteId) {

        // This is going to get all the notes
        return this.getNotes()

            // This will take the notes filter the note by the chosen id if this note does not match the id of the other notes it will remove it
            .then((notes) => notes.filter((note) => note.id !== noteId))

            // Repopulating all the notes excluding the one with the id that was selected
            .then((afterDeleted) => this.writeNotes(afterDeleted));
    }
}

module.exports = new Store();