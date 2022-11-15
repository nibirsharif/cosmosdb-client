const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const authorization = req.header('Authorization');
    const token = authorization && authorization.split(' ')[1];
    if (!token) return res.status(401).send('Access Denied.');

    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token.');
    }
}
