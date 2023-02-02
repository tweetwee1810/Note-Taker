const fs = require('fs');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const api = require('./routes')


//middleware for paths
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', api)
//returns index and notes.html
app.get('/', (req, res) => 
res.sendFile(path.join(__dirname, '/public/index.html'))
);
app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//retuns notes from db.json
app.post('/notes', (req,res) => {
    console.info(`${req.method} request received`);
})

//delete 
app.delete('/notes/id', (req, res) => {
    console.info(`${req.method} deleted request was called`);
})

let deleteData = fs.readFileSync('./db/db.json');

app.listen(PORT, () =>{
    console.log(`App listening at http://localhost:${PORT} 🚀`)
});