const jwt = require('jsonwebtoken');
const configEnv = require('../config');

function generateToken(options = {}) {
    return jwt.sign({}, configEnv.secretKey, options);
}

function verifyToken(token) { // isTokenVerified
    try {
        return jwt.verify(token, configEnv.secretKey);
    } catch (err) {
        throw new Error('Invalid or expired token');
    }
}

module.exports = {
    generateToken,
    verifyToken,
};