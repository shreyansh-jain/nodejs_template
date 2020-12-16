const jwt = require('jsonwebtoken');
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];
const secret = stage.JWT_SECRET;
const pool = require('../model/mysql_connection');
const morgan = require('morgan');
var async = require('async')
const DatabaseService = require('./DatabaseService');


module.exports = function (io) {
    try {
        io.use(function (socket, next) {
            if (socket.handshake.query && socket.handshake.query.token) {
                jwt.verify(socket.handshake.query.token, secret, function (err, decoded) {
                    if (err) {
                        return next(new Error('Authentication error'))
                    }
                    socket.decoded = decoded;
                    next();
                });
            } else {
                next(new Error('Authentication error'));
            }
        })
            .on('connection', function (socket) {
                if (socket.decoded != undefined && socket.decoded.id != undefined) {
                    if (socket.decoded.role !== undefined) {
                        let update_socket_id = `update manager set socket_id='${socket.id}' where row_id='${socket.decoded.id}'`
                        pool.query(update_socket_id, (err, result) => {
                            if (!err) { }
                        })
                    } else if (socket.decoded.role === undefined) {
                        let update_socket_id = `update rider set socket_id='${socket.id}' where row_id='${socket.decoded.id}'`
                        pool.query(update_socket_id, (err, result) => {
                            if (!err) { }
                        })
                    }
                }
            });
    }
    catch (e) {
        console.log("Socket Error: ", e)
    }
};