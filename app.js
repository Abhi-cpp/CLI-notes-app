const validator = require('validator')
const chalk = require('chalk')
const notes = require('./notes')
const yargs = require('yargs')
const { string } = require('yargs')

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note Title',
            type: 'string',
            demandOption: true
        },
        body: {
            describe: 'Note Body',
            type: 'string',
            demandOption: true
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            type: string,
            demandOption: true
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'Lits down all the notes',
    handler() {
        notes.listnotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'Read the note',
    builder: {
        title: {
            type: string,
            demandOption: true,
            describe: 'Title of notes'

        }
    },
    handler(argv) {
        notes.readNotes(argv.title)
    }
})

yargs.parse();

