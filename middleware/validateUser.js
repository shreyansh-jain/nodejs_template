const jwt = require('jsonwebtoken');
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];
const secret = stage.JWT_SECRET;
var pool = require('../model/mysql_connection');
const DatabaseService = require('../services/DatabaseService');

module.exports = {
    validateToken: async (req, res, next) => {
        const authorizationHeaader = req.headers.authorization;
        let result;
        if (authorizationHeaader) {
            const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
            const options = {
            };
            try {
                next()
                // result = jwt.verify(token, secret, options);
                // let data = await DatabaseService.check_user_logged_in(token, result.id)
                // if (data === true) {
                //     req.decoded = result;
                //     next();
                // }
                // else {
                //     result = {
                //         error: `False Token.`,
                //         status: 401
                //     };
                //     res.status(401).send(result);
                // }
            } catch (err) {
                next()
                // result = {
                //     error: `False Token.`,
                //     status: 401
                // };
                // res.status(401).send(result);
            }
        } else {
            result = {
                error: `Authentication error. Token required.`,
                status: 401
            };
            res.status(401).send(result);
        }
    }
};
