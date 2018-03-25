const yargs = require('yargs');

const notes = require('./notes.js');

var titleOptions =  {
    describe: 'Title of a note',
    require: true,
    alias: 't'
};
var bodyOptions = {
    describe: 'Body of a note',
    require: true,
    alias: 'b'
};
var argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help()
    .argv
var command = process.argv[2];

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note !== undefined) {
        console.log('Created')
    } else {
        console.log('Note title taken');
    }
} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`)
    allNotes.forEach((note) => console.log(note));
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    if (noteRemoved) {
        console.log('Note removed')
    } else {
        console.log('Note not found')
    }
} else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
        console.log(`Note found: ${note.body}`)
    } else {
        console.log('Note not found')
    }
}
else {
    console.log("Command not recognized")
}