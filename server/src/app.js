const express = require('express');
const cors = require('cors');
const middlewares = require('./middlewares');
const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.DB_CONNECTION, {
        useUnifiedTopology: true,
        useNewUrlParser: true
}, () => { console.log('Database Connected') });

const postRoute = require('./routes/test')
const authRoute = require('./routes/auth');
const messageRoute = require('./routes/message');

const app = express();
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    res.json({
        message: 'Hello World!'
    })
})

app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)
app.use('/api', messageRoute)

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;