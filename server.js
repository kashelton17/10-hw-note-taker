//creating server listening on port
const express = require('express')
const path = require('path')
const JSONdb = require('./db/db.json')
const fs = require('fs')

const app = express()
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true}))
app.use(express.json())

//routes

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')))

app.get('/api/notes', (req, res) => res.json(JSONdb))