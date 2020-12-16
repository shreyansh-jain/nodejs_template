
const MongoClient = require('mongodb').MongoClient;
const uri = "** REPLACE WITH ACTUAL CONTENT ** ";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = client;
