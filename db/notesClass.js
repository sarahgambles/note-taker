const util = require("util");
const fs = require("fs");

const uuidv1 = require("uuid/v1");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);



class Notes {
    readNotes() {
        return readFileAsync("db/db.json", "utf8");
    }

    writeNotes(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note));
    }

    getNotes() {
        return this.readNotes().then(allNotes => {
            let addedNotes;
            try {
                addedNotes = [].concat(JSON.parse(allNotes))
            } catch (err) {
                addedNotes = [];
            }

            return addedNotes;
        });
    }

    addNotes(note) {
        const { title, text } = note

        const newNote = { title, text, id:uuidv1() }
        return this.getNotes().then(notes => [...notes, newNote])
        .then(updatedNotes => this.writeNotes(updatedNotes))
        .then(() => newNote)
    }

    deleteNotes(id) {
        return this.getNotes().then(notes => notes.filter(note => note.id !== id))
        .then(filteredNotes => this.writeNotes(filteredNotes))
    }
}

module.exports = new Notes();