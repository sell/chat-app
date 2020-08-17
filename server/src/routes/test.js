const express = require('express');
const router = express.Router();
const verify = require('./verifyToken')
const jwt = require('jsonwebtoken')
router.get('/',  verify, (req, res) => {
    jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                authData
            })
        }
    })

})

module.exports = router;