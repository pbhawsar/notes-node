const fs = require('fs');
let fetchNotes = () => {
    try {
        let noteString = fs.readFileSync('notes-data.json');
        return JSON.parse(noteString);
    } catch (e) {
        return [];
    }
};


let saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

let addNote = (title, body) => {
    let notes = fetchNotes();
    let note = {
        title,
        body
    };
    let duplicateNotes = notes.filter((note) => note.title === title);
    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

let getAll = () => {
    console.log('getting all notes!\n\t');
    return fetchNotes();
};

let getNote = (title) => {
    console.log('getting notes', title);
    let notes = fetchNotes();
    let matchedNote = notes.filter((note) => note.title === title);
    if (matchedNote) {
        return matchedNote[0];
    }

};

let removeNote = (title) => {
    console.log('removing notes', title);
    let notes = fetchNotes();
    let filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);
    return notes.length !== filteredNotes.length;
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
};