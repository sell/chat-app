const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation')

router.post('/register', async (req, res) => {

    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // checking if user is already in db
    const userExist = await User.findOne({ username: req.body.username});
    if ( userExist ) return res.status(400).send('Username already exists')
    const emailExist = await User.findOne({ email: req.body.email});
    if ( emailExist ) return res.status(400).send('Email already exists')

    // Hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    // creating a user
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save()
        res.send({user: user.username})
    } catch (e) {
        res.status(400).send(e)
    }
});

// Login

router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    // checking if user exists
    const user = await User.findOne({ username: req.body.username });
    if ( !user ) return res.status(400).send('Username or Password is wrong');

    // checking if password matches
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Username or Password is wrong')

    // jwt token
    const token = jwt.sign({
        username: user.username
    }, process.env.TOKEN_SECRET, {
        expiresIn: '1h'
    })
    // res.header('auth-token', token)
    res.json({
        token: token
    })

});

module.exports = router;
