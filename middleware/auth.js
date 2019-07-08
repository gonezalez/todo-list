const config = require('config');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
    
        if(!token) {
            res.status(401)
                .json({ msg: 'Se necesita un token.' });
        } else {
            const decoded = jwt.verify(token, config.get('jwtSecret'));
            req.user = decoded;
            next();
        }
    } catch (e) {
        res.status(400)
            .json({ msg: 'Token invalido.' });
    }
}

module.exports = auth;