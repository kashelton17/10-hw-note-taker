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

//creating 'database' route
app.get('/api/notes', (req, res) => res.json(JSONdb))

// getting single note based on id input in routename
app.get('/api/notes/:note', (req, res) => {
    const note = req.params.note
    JSONdb.forEach(element => {
        if (note === element.id) {
            return res.json(element)
        }  
    })
    return 'Sorry no notes found with that ID'
})

//adding ability to delete a specified note
app.delete('/api/notes/:note', (req, res) => {
    const note = req.params.note
    JSONdb.forEach(element => {
        if (note === element.id) {
            let index = JSONdb.indexOf(element)
            JSONdb.splice(index, 1)
            fs.writeFile('./db/db.json', JSON.stringify(JSONdb), err => {
                if (err) throw err;
                console.log('Item was deleted')
            })
            return res.json(JSONdb)
        }  
    })
    return 'Sorry no notes found with that ID'
})

// adding ability to post to /api/notes route
app.post('/api/notes', (req, res) => {
    const newNote = req.body
    let random = Math.floor(Math.random() * 34029384)
    let uniqueID = `${newNote.title}${random}`
    newNote.id = uniqueID.replace(/\s+/g, '').toLowerCase()
    JSONdb.push(newNote)
    let data = JSON.stringify(JSONdb)
    
    fs.writeFile('./db/db.json', data, err => {
        if (err) throw err;
        console.log('The new note was saved')
    })
    res.json(data)
    
})

// listening on port
app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}/`))