const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({
            message: 'unauthentication'
        })
    }

    if (token.toLowerCase().startsWith('bearer')) {
        token = token.slice('bearer'.length).trim()
    }

    try {
        const jwtPayload = jwt.verify(token, 'secret_key');

        if (!jwtPayload) {
            return res.status(403).json({
                message: 'huss go away'
            })
        }

        res.user = {
            id: jwtPayload
        }

        next();
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

module.exports = checkToken