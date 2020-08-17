const jwt = require('jsonwebtoken');

// module.exports = function (req, res, next) {
//     const token = req.header('auth-token');
//     if (!token) return res.status(401).send('Access Denied');
//
//     try {
//         // const verified = jwt.verify(token, process.env.TOKEN_SECRET);
//         // req.user = verified;
//
//         req.user = jwt.verify(token, process.env.TOKEN_SECRET);
//         next();
//     } catch (e) {
//         res.status(400).send('Invalid Token')
//     }
// }

module.exports = function (req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const beaerToken = bearer[1]
        req.token = beaerToken;
        next();
    } else {
        res.sendStatus(403)
    }
}