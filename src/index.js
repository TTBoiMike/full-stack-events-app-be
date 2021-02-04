const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {v4: uuidv4} = require('uuid');
const mongoose = require('mongoose');

// import schema
const {User} = require('../models/user')
const {Event} = require('../models/event')

// create express app
const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())

// connect to events-app database
mongoose.connect('mongodb+srv://mikethorpe:flanman6869@cluster0.cn3w3.mongodb.net/events-app', { useNewUrlParser: true, useUnifiedTopology: true } )


//signup new user
app.post('/signup', async (req, res) => {
    const newUser = new User({username: req.body.username, password: req.body.password})
    try {
        await newUser.save() 
        res.sendStatus(200)
    }
    catch {
        res.sendStatus(500)
    }
})

//signin existing user
app.post('/auth', async (req, res, next) => {
    const user = await User.findOne({username: req.body.username})
    if(!user) {
        return res.sendStatus(401)
    }
    if(req.body.password !== user.password) {
        return res.sendStatus(403)
    }
    user.token = uuidv4()
    await user.save()
    res.send({token: user.token})
})



// CRUD - CREATE event in db
app.post('/', async (req, res) => {
    const newEvent = new Event(req.body)
    try{
        await newEvent.save()
        res.status(200).send({message: "New event added!"})
    } catch {
        res.sendStatus(500)
    }
})



// starting express server
app.listen(3001, () => {
    console.log('listening on port 3001');
});

// checking Mongo connection
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback() {
    console.log("Database connected!")
});