require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
const jwt = require('jsonwebtoken');
const environment = process.env.NODE_ENV;
const stage = require('./config')[environment];
const secret = stage.JWT_SECRET;
const pool = require('./model/mysql_connection');
const morgan = require('morgan');
var async = require('async');

// // Log4j Traces
// const log4js_trace = require("log4js");
// const log4js_debug = require("log4js");
// const log4js_info = require("log4js");
// const log4js_warn = require("log4js");
// const log4js_fatal = require("log4js");


// log4js_trace.configure({
//   appenders: {
//     trace: { type: 'file', filename: stage.log_path + 'trace.log' }
//   },
//   categories: { default: { appenders: ['trace'], level: 'trace' } }
// });

// log4js_debug.configure({
//   appenders: {
//     debug: { type: 'file', filename: stage.log_path + 'debug.log' },
//   },
//   categories: { default: { appenders: ['debug'], level: 'debug' } }
// });

// log4js_info.configure({
//   appenders: {
//     info: { type: 'file', filename: stage.log_path + 'info.log' },
//   },
//   categories: { default: { appenders: ['info'], level: 'info' } }
// });

// log4js_warn.configure({
//   appenders: {
//     warn: { type: 'file', filename: stage.log_path + 'warn.log' },
//   },
//   categories: { default: { appenders: ['warn'], level: 'warn' } }
// });

// log4js_fatal.configure({
//   appenders: {
//     fatal: { type: 'file', filename: stage.log_path + 'fatal.log' },
//   },
//   categories: { default: { appenders: ['fatal'], level: 'fatal' } }
// });

// const logger_trace = log4js_trace.getLogger('trace');
// logger_trace.level = "trace";

// const logger_debug = log4js_debug.getLogger('debug');
// logger_debug.level = "debug";

// const logger_info = log4js_info.getLogger('info');
// logger_info.level = "info";

// const logger_warn = log4js_warn.getLogger('warn');
// logger_warn.level = "warn";

// const logger_fatal = log4js_fatal.getLogger('fatal');
// logger_fatal.level = "fatal";

// logger_trace.trace('1');
// logger_trace.debug('2');
// logger_trace.info('3');
// logger_trace.warn('4');
// logger_trace.error('5');
// logger_trace.fatal('6');

// logger_debug.trace('7');
// logger_debug.debug('7');
// logger_debug.info('7');
// logger_debug.warn('7');
// logger_debug.error('7');
// logger_debug.fatal('7');

// logger_info.trace('8');
// logger_info.debug('8');
// logger_info.info('8');
// logger_info.warn('8');
// logger_info.error('8');
// logger_info.fatal('8');

// logger_warn.trace('9');
// logger_warn.debug('9');
// logger_warn.info('9');
// logger_warn.warn('9');
// logger_warn.error('9');
// logger_warn.fatal('9');

// logger_fatal.trace('10');
// logger_fatal.debug('10');
// logger_fatal.info('10');
// logger_fatal.warn('10');
// logger_fatal.error('10');
// logger_fatal.fatal('10');

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + stage.client));
const html = stage.client

const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.gif',
  '.jpeg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
  '.pdf',
];

app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));
app.use(cors());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(morgan('dev'));

// Route For Version 1
const v1 = require('./versions/v1')

// API Call For Version 1 
app.use('/v1', v1)

const server = app.listen(`${stage.port}`, () => {
  console.log(`Server now listening at localhost:${stage.port}`);
});

server.timeout = 1000000;

const io = require('socket.io').listen(server);
require('./services/SocketService')(io);

app.get('/images/*', function (req, res, next) {
  if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
    res.sendFile(path.resolve(`./${req.url}`));
  } else {
    res.sendFile(path.resolve(`./images/default.png`));
  }
});

app.get('*', function (req, res, next) {
  if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
    res.sendFile(path.resolve(stage.client + `/${req.url}`));
  } else {
    res.sendFile('index.html', {
      root: html
    });
  }
});

module.exports = app;
