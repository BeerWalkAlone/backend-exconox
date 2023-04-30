
const express = require('express')
const app = express()
const port = 3001

const Auth = require('./routers/Auth')
const project = require('./routers/project')
const Image = require ('./routers/images')
const stories = require('./routers/Stories')
const User = require('./routers/User')

app.use(project)
app.use(Auth)
app.use(Image)
app.use(stories)
app.use(User)

app.get('/', async (request, response) => {
    // const query = 'SELECT * from User'
    // const result = await db.fetch(query, [])
    response.send("hello")
})

app.listen(port)