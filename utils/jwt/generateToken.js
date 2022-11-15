const jwt = require('jsonwebtoken');

module.exports = function (user_id) {
    return jwt.sign({ id: user_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
}
