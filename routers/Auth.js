
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const db = require('../modules/db')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')

dotenv.config()
app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors({
    // origin: 'https://font-end-project-exconox.vercel.app',
    origin: 'http://localhost:5173',
    credentials: true
}))

app.post('/register', async (request, response) => {
    const { email, password, username, firstname, lastname, conpassword } = request.body

    const checkEmailUserQuery = "SELECT * FROM user WHERE email = ?"
    const checkParmas = [email]

    const checkExist = await db.fetch(checkEmailUserQuery, checkParmas)
    if (checkExist.length > 0) {
        response.send('Register fail,email exist')
    } else {
        const encryptPass = await bcrypt.hash(password, 10)
        const CreateUserQuery = 'INSERT INTO user (email, password, username, firstname, lastname) VALUES (?, ? , ?, ?, ?)'
        const Params = [email, encryptPass, username, firstname, lastname]
        const result = await db.update(CreateUserQuery, Params)
        response.send(result)
    }

})
app.post('/login', async (request, response) => {
    const { email, password } = request.body
    const checkEmailUserQuery = "SELECT id,password FROM user WHERE email = ?"
    const params = [email]
    const user = await db.fetch(checkEmailUserQuery, params)

    // response.send(user)
    if (user.length > 0) {
        const comparePassword = await bcrypt.compare(String(password), user[0].password)
        if (comparePassword) {
            let payload = {
                id: user[0].id
            }
            let token = jwt.sign(
                payload, process.env.SECRET_KEY, { expiresIn: '1h' });
            response.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 360000// 1hour
            })

            const userInfosql = 'SELECT id, email, username, lastname, img FROM user WHERE id =?'
            const userParams = [user[0].id]
            const userInfo = await db.fetch(userInfosql, userParams)

            response.send({
                status: 200,
                msg: 'Login success',
                data: userInfo[0]
            })
        } else {
            response.send({
                status: 409,
                msg: 'Worng password'
            })
        }
    } else {
        response.send({
            status: 404,
            msg: 'User does not exist'
        })
    }
})

app.post('/refresh', async (request, response) => {
    try {
        const { token } = request.cookies
        const userVerify = await jwt.verify(token, process.env.SECRET_KEY)

        if (userVerify.id) {
            const userInfosql = 'SELECT id, email, username, lastname, img FROM user WHERE id =?'
            const userParams = [userVerify.id]
            const userInfo = await db.fetch(userInfosql, userParams)

            response.send({
                status: 200,
                msg: 'token is valid',
                data:userInfo[0]
            })
        } else {
            response.send({
                status: 400,
                msg: 'token is valid'
            })
        }
    } catch (e) {
        response.send(e)
    }
})

app.get('/user', async (request, response) => {
    const query = 'SELECT * from user'
    const result = await db.fetch(query, [])
    response.send(result)
})


module.exports= app