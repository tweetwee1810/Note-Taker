const router = require('express').Router()
const fs = require('fs');
const path = require('path');
router.get('/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        let notes = JSON.parse(data);
        res.status(200).json(notes)
    })
})
 //retuns notes from db.json
router.post('/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading notes file');
        } else {
            let notes = JSON.parse(data);
            const newNote = req.body;
            newNote.id = notes.length + 1;
            notes.push(newNote);
            fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), (err) => {
                if (err) {
                    res.status(500).send('Error writing to notes file');
                } else {
                    res.status(200).send(newNote);
                }
            });
        }
    });
    console.info(`${req.method} request received`);
});

//delete 
router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    console.info(`${req.method} deleted request was called`);
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
      let notes = JSON.parse(data);
      const remainingNotes = notes.filter(note => note.id !== noteId);
      fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(remainingNotes), (err) => {
        if (err) {
          res.status(500).json({ error: 'Failed to delete note' });
          return;
        }
        res.status(200).json({ message: 'Note deleted successfully' });
      });
    });
  });
  

// let deleteData = fs.readFileSync('./db/db.json');
module.exports = router;