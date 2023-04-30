
const express = require('express')
const app = express()
const db = require('../modules/db')
// const cookieParser = require('cookie-parser')
// const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
// const { request, response } = require('./project')

// dotenv.config()
// app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.get('/hello',async(request, response) =>{
    response.send("hello")
})


app.get('/project', async (request, response) => {
    const query = 'SELECT id, projectName, projectDescription, projectImg from project'
    const result = await db.fetch(query, [])
    response.send(result)
})

module.exports = app