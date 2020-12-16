
var pool = require('../model/mysql_connection');
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];
const jwt = require('jsonwebtoken');
const secret = stage.JWT_SECRET;
var nodemailer = require('nodemailer');
const http = require('http');
var qs = require("querystring");
var aes256 = require('aes256');
var crypto = require('crypto');

// Setup for mailing
const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    secure: false,
    auth: {
        user: stage.email,
        pass: stage.password
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = {
    // Check If The Data Exist in Database Already
    check_status_for_existence_in_database: async function (query) {
        return new Promise((resolve, reject) => {
            try {
                let exist_query = `SELECT EXISTS(` + query + `) as 'EXISTS'`
                pool.query(exist_query, (err, results, fields) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(results[0].EXISTS);
                    }
                })
            }
            catch (e) {
                reject(e)
            }
        })
    },
    // Fetch Data from Database for a single query
    fetch_data: async function (query) {
        return new Promise((resolve, reject) => {
            try {
                pool.query(query, (err, results, fields) => {
                    if (err) {
                        let response = {
                            code: 500,
                            result: err
                        }
                        reject(response)
                    } else {
                        let response = {
                            code: 200,
                            result: results
                        }
                        resolve(response);
                    }
                })
            }
            catch (e) {
                reject(e)
            }
        })
    },
    // Transaction with single query
    single_query_transaction: async function (query) {
        return new Promise((resolve, reject) => {
            try {
                pool.getConnection((err, connection) => {
                    if (err) {
                        let response = {
                            result: err,
                            code: 500
                        }
                        reject(response)
                    } else {
                        connection.beginTransaction((err) => {
                            if (err) {
                                connection.release();;
                                let response = {
                                    result: err,
                                    code: 500
                                }
                                reject(response)
                            } else {
                                connection.query(query, (err, result, fields) => {
                                    if (err) {
                                        connection.release();
                                        let response = {
                                            result: err,
                                            code: 500
                                        }
                                        reject(response)
                                    } else {
                                        connection.commit((err) => {
                                            if (err) {
                                                let response = {
                                                    result: err,
                                                    code: 500
                                                }
                                                reject(response)
                                            } else {
                                                connection.release();
                                                let response = {
                                                    result: result,
                                                    code: 200
                                                }
                                                resolve(response)
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
            catch (e) {
                reject(e)
            }
        })
    },
    // Transaction with double query
    double_query_transaction: async function (query1, query2) {
        return new Promise((resolve, reject) => {
            try {
                pool.getConnection((err, connection) => {
                    if (err) {
                        let response = {
                            result: err,
                            code: 500
                        }
                        reject(response)
                    } else {
                        connection.beginTransaction((err) => {
                            if (err) {
                                connection.release();;
                                let response = {
                                    result: err,
                                    code: 500
                                }
                                reject(response)
                            } else {
                                connection.query(query1, (err, result, fields) => {
                                    if (err) {
                                        connection.release();
                                        let response = {
                                            result: err,
                                            code: 500
                                        }
                                        reject(response)
                                    } else {
                                        connection.query(query2, (err, result, fields) => {
                                            if (err) {
                                                connection.release();
                                                let response = {
                                                    result: err,
                                                    code: 500
                                                }
                                                reject(response)
                                            } else {
                                                connection.commit((err) => {
                                                    if (err) {
                                                        let response = {
                                                            result: err,
                                                            code: 500
                                                        }
                                                        reject(response)
                                                    } else {
                                                        connection.release();
                                                        let response = {
                                                            result: result,
                                                            code: 200
                                                        }
                                                        resolve(response)
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
            catch (e) {
                reject(e)
            }
        })
    },
    // Transaction with triple query
    triple_query_transaction: async function (query1, query2, query3) {
        return new Promise((resolve, reject) => {
            try {
                pool.getConnection((err, connection) => {
                    if (err) {
                        let response = {
                            result: err,
                            code: 500
                        }
                        reject(response)
                    } else {
                        connection.beginTransaction((err) => {
                            if (err) {
                                connection.release();;
                                let response = {
                                    result: err,
                                    code: 500
                                }
                                reject(response)
                            } else {
                                connection.query(query1, (err, result, fields) => {
                                    if (err) {
                                        connection.release();
                                        let response = {
                                            result: err,
                                            code: 500
                                        }
                                        reject(response)
                                    } else {
                                        connection.query(query2, (err, result, fields) => {
                                            if (err) {
                                                connection.release();
                                                let response = {
                                                    result: err,
                                                    code: 500
                                                }
                                                reject(response)
                                            } else {
                                                connection.query(query3, (err, result, fields) => {
                                                    if (err) {
                                                        connection.release();
                                                        let response = {
                                                            result: err,
                                                            code: 500
                                                        }
                                                        reject(response)
                                                    } else {
                                                        connection.commit((err) => {
                                                            if (err) {
                                                                let response = {
                                                                    result: err,
                                                                    code: 500
                                                                }
                                                                reject(response)
                                                            } else {
                                                                connection.release();
                                                                let response = {
                                                                    result: result,
                                                                    code: 200
                                                                }
                                                                resolve(response)
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
            catch (e) {
                reject(e)
            }
        })
    },
    // Transaction with quad query
    quad_query_transaction: async function (query1, query2, query3, query4) {
        return new Promise((resolve, reject) => {
            try {
                pool.getConnection((err, connection) => {
                    if (err) {
                        let response = {
                            result: err,
                            code: 500
                        }
                        reject(response)
                    } else {
                        connection.beginTransaction((err) => {
                            if (err) {
                                connection.release();;
                                let response = {
                                    result: err,
                                    code: 500
                                }
                                reject(response)
                            } else {
                                connection.query(query1, (err, result, fields) => {
                                    if (err) {
                                        connection.release();
                                        let response = {
                                            result: err,
                                            code: 500
                                        }
                                        reject(response)
                                    } else {
                                        connection.query(query2, (err, result, fields) => {
                                            if (err) {
                                                connection.release();
                                                let response = {
                                                    result: err,
                                                    code: 500
                                                }
                                                reject(response)
                                            } else {
                                                connection.query(query3, (err, result, fields) => {
                                                    if (err) {
                                                        connection.release();
                                                        let response = {
                                                            result: err,
                                                            code: 500
                                                        }
                                                        reject(response)
                                                    } else {
                                                        connection.query(query4, (err, result, fields) => {
                                                            if (err) {
                                                                connection.release();
                                                                let response = {
                                                                    result: err,
                                                                    code: 500
                                                                }
                                                                reject(response)
                                                            } else {
                                                                connection.commit((err) => {
                                                                    if (err) {
                                                                        let response = {
                                                                            result: err,
                                                                            code: 500
                                                                        }
                                                                        reject(response)
                                                                    } else {
                                                                        connection.release();
                                                                        let response = {
                                                                            result: result,
                                                                            code: 200
                                                                        }
                                                                        resolve(response)
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
            catch (e) {
                reject(e)
            }
        })
    },
    // get a random x digit id of "length" and input "characters"
    get_random_id: async function (length, chars) {
        return new Promise((resolve, reject) => {
            try {
                var result = '';
                for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
                resolve(result)
            }
            catch (e) {
                reject(e);
            }
        })
    },
    // Create User Account
    create_user_account: async function (insert_into_user_credentials, insert_into_user_details_initial, insert_into_user_details_final, insert_into_delivery_locations_initial, insert_into_delivery_locations_final, user_data, otp) {
        return new Promise((resolve, reject) => {
            try {
                pool.getConnection((err, connection) => {
                    if (err) {
                        let response = {
                            result: err,
                            code: 500
                        }
                        reject(response)
                    } else {
                        connection.beginTransaction((err) => {
                            if (err) {
                                connection.release();;
                                let response = {
                                    result: err,
                                    code: 500
                                }
                                reject(response)
                            } else {
                                connection.query(insert_into_user_credentials, (err, result, fields) => {
                                    if (err) {
                                        connection.release();
                                        let response = {
                                            result: err,
                                            code: 500
                                        }
                                        reject(response)
                                    } else {
                                        let user_id = result.insertId;
                                        connection.query(insert_into_user_details_initial + user_id + insert_into_user_details_final, (err, result, fields) => {
                                            if (err) {
                                                connection.release();
                                                let response = {
                                                    result: err,
                                                    code: 500
                                                }
                                                reject(response)
                                            } else {
                                                connection.query(insert_into_delivery_locations_initial + user_id + insert_into_delivery_locations_final, (err, result, fields) => {
                                                    if (err) {
                                                        connection.release();
                                                        let response = {
                                                            result: err,
                                                            code: 500
                                                        }
                                                        reject(response)
                                                    } else {
                                                        const payload = { ...user_data, id: user_id };
                                                        const options = {};
                                                        const token = jwt.sign(payload, secret, options);
                                                        let insert_into_session = `INSERT INTO session (user_id, token) VALUES ('${user_id}', '${token}')`
                                                        connection.query(insert_into_session, (err, result, fields) => {
                                                            if (err) {
                                                                connection.release();
                                                                let response = {
                                                                    result: err,
                                                                    code: 500
                                                                }
                                                                reject(response)
                                                            } else {
                                                                connection.commit((err) => {
                                                                    if (err) {
                                                                        let response = {
                                                                            result: err,
                                                                            code: 500
                                                                        }
                                                                        reject(response)
                                                                    } else {
                                                                        connection.release();
                                                                        let response = {
                                                                            result: result,
                                                                            code: 200,
                                                                            token: token
                                                                        }
                                                                        resolve(response)
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
            catch (e) {
                reject(e)
            }
        })
    },
    // Check If User Is Logged In
    check_user_logged_in: async function (token, user_id) {
        let query = `select token from session where user_id='${user_id}'`;
        return new Promise((resolve, reject) => {
            try {
                pool.query(query, (err, results, fields) => {
                    if (err) {
                        let response = {
                            code: 500,
                            result: err
                        }
                        reject(response)
                    } else {
                        if (results != undefined && results.length > 0) {
                            if (results[0].token === token) {
                                resolve(true)
                            } else {
                                reject(false)
                            }
                        } else {
                            reject(false)
                        }
                    }
                })
            }
            catch (e) {
                reject(e)
            }
        })
    }
}


