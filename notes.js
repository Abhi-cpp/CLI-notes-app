const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return "your notes..."
}

loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const data = dataBuffer.toString()
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

saveNotes = (notes) => {
    const data = JSON.stringify(notes)
    fs.writeFileSync('notes.json', data)
}

addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNotes = notes.find(
        (note) => note.title === title
    )

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New notes added');
    }
    else {
        console.log('Note Title Taken')
    }
}

removeNote = (title) => {
    const note = loadNotes();
    const newnote = note.filter((element) => element.title !== title
    )

    if (JSON.stringify(newnote) === JSON.stringify(note)) {
        console.log(chalk.bgRed('No note found!'))
    }
    else {
        saveNotes(newnote)
        console.log(chalk.bgGreen('Note Removed!'))
    }
}
listnotes = () => {
    const note = loadNotes()
    console.log(chalk.bgRed.bold.blue('Your notes'))
    note.map((element) => {
        console.log(chalk.bgWhite.bold(element.title));
    })

}

readNotes = (title) => {
    const notes = loadNotes()
    const note = notes.find((element) => element.title === title)
    if (note)
        console.log(chalk.bold.yellow(note.title) + '\n' + chalk.bold.red(note.body))
    else
        console.log(chalk.bgRed.bold.italic('Not found!'))
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listnotes: listnotes,
    readNotes: readNotes
}