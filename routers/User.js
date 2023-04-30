const express = require('express')
const app = express()
const db = require('../modules/db')
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(db)

app.get('/users/:id', async (req, res) => {
    try {
        const {id} = req.params
        const query = 'SELECT id, firstname, lastname, username, email, img FROM user WHERE id=?'
        const result = await db.fetch(query,[id])
        res.send(result)
    } catch (error) {
        res.send(error)
    } 
})

app.put('/updateUser/:id', async (req, res) => {
    try {
        const {id} = req.params
        const { firstname, lastname, username,email} = req.body
        const query = "UPDATE user SET firstname =?, lastname =?,  email =?, username =? WHERE id =?"
        const params = [ firstname, lastname, email, username,id] 
        const result = await db.update(query, params)     
        res.send(result)     
        
    } catch (error) {
        res.send(error)
    }
})

app.delete('/deleteUder/:id', async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

module.exports = app