console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes.js');
const titleOptions = {
    describe: 'title of note',
    demand: true,
    alias: 't'
};
const bodyOptions = {
    describe: 'body of note',
    demand: true,
    alias: 'b'
};
const argv = yargs
    .command('add', 'add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'list all notes')
    .command('read', 'read a note', {
        title: titleOptions
    })
    .command('remove', 'remove a note', {
        title: titleOptions
    })
    .help()
    .argv;

var command = argv._[0];
console.log('Command: ', command);
console.log('Yargs', argv);

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note created');
    } else {
        console.log('Note title taken');
    }
} else if (command === 'list') {
    let allNotes = notes.getAll();
    // console.log(JSON.stringify(allNotes, null, 4));
    allNotes.forEach((note) => {
        console.log(`Title is ${note.title}`);
        console.log(`Body is ${note.body}`);
    });


} else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
        console.log('Note found');

    } else {
        console.log('Note not found');
    }
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
} else {
    console.log('Command not recognized');
}