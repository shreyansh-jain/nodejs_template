try {
    const DatabaseService = require('../services/DatabaseService');
    const BasicService = require('../services/BasicService');
    const ServerResponse = require('../response');
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
    const { body, validationResult } = require('express-validator');

    exports.list = async (req, res, next) => {
        try{

        }
        catch(error){
            res.status(500).send({
                code: 500, 
                message: 'Internal Server Error'
            })
        }
    }

    exports.view = async (req, res, next) => {
        try{

        }
        catch(error){
            res.status(500).send({
                code: 500, 
                message: 'Internal Server Error'
            })
        }
    }

    exports.update = async (req, res, next) => {
        try{

        }
        catch(error){
            res.status(500).send({
                code: 500, 
                message: 'Internal Server Error'
            })
        }
    }

    exports.create = async (req, res, next) => {
        try{

        }
        catch(error){
            res.status(500).send({
                code: 500, 
                message: 'Internal Server Error'
            })
        }
    }

    exports.delete = async (req, res, next) => {
        try{

        }
        catch(error){
            res.status(500).send({
                code: 500, 
                message: 'Internal Server Error'
            })
        }
    }

} catch (e) {
    console.log(e)
}