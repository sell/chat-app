const express = require('express');
const router = express.Router()
const verify = require('./verifyToken')
const messages = require('../models/Message');

function isValidMessage(message) {
    return message.message && message.message.toString().trim() !== '';
}

router.post('/message', verify, async (req, res) => {
    if (isValidMessage(req.body)) {
        // const message = {
        //     message: req.body.message.toString()
        // }
        console.log('route hit')
        const message = new messages({
            user: req.body.user.toString(),
            message: req.body.message.toString()
        })
        await message.save()
        console.log(message)
        res.json({
            message: 'Successfully sent your message'
        })
    } else {
        res.status(422);
        res.json({
            message: 'A message is required...'
        })
    }
})

router.get('/message', verify, async (req, res) => {
    messages.find().sort({date: -1}).then(items => res.json(items))
})
module.exports = router