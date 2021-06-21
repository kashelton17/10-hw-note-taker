//creating server listening on port
const express = require('express')
const path = require('path')
const JSONdb = require('./db/db.json')
const fs = require('fs')


const app = express()
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(__dirname + '/public/'));


//routes

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')))
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')))

app.get('/api/notes', (req, res) => res.json(JSONdb))

app.get('api/notes/:noteID', (req, res) => {
    const note = req.params.noteID
    JSONdb.forEach(element => {
        if (note === element.id) {
            return res.json(element)
        }
        return false
    });
})

app.post('/api/notes', (req, res) => {
    const newNote = req.body
    let random = Math.floor(Math.random() * 34029384)
    let uniqueID = `${newNote.title}${random}`
    newNote.id = uniqueID
    console.log(newNote)
    JSONdb.push(newNote)
    let data = JSON.stringify(JSONdb)
    
    fs.writeFile('./db/db.json', data, err => {
        if (err) throw err;
        console.log('The new note was saved')
    })
    
})

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}/`))