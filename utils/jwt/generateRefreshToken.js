const jwt = require('jsonwebtoken');

module.exports = function (user_id) {
    return jwt.sign({ id: user_id }, process.env.REFRESH_TOKEN_SECRET);
}
