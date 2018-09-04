const {
    Client
} = require('pg');
const {
    MPG
} = require('./models');

const config = require('../../config.json');

const DBClient = require('../db/client');
const queries = require('../utils/pgsql');

const utils = require('../utils/utils');

exports.getListOfMPGS = (event, context, callback) => {
    const client = new Client(config);
    client.connect()
        .then(() => console.log('Connected to PostgreSQL database'))
        .catch(err => console.error('Connection error', err.stack));

    client.query(queries.select('gasmpg.mpg'))
        .then(res => callback(null, utils.copyObj(res.rows)))
        .catch(err => {
            console.error(err);
            callback(err, null);
        })
        .then(() => client.end())
}

exports.postOneMPG = (event, context, callback) => {
    const client = new Client(config);
    client.connect()
        .then(() => console.log('Connected to PostgreSQL database'))
        .catch(err => console.error('Connection error', err, err.stack));

    const model = new MPG(event.miles, event.gallons, event.total, event.notes);

    client.query(queries.insert('gasmpg.mpg', model.columns, model.values))
        .then(res => callback(null, utils.copyObj(res.rows)))
        .catch(err => {
            console.error(err);
            callback(err, null);
        })
        .then(() => client.end())
}

// WIP
exports.postManyMPGs = (event, context, callback) => {
    const client = new Client(config);
    client.connect()
        .then(() => console.log('Connected to PostgreSQL database'))
        .catch(err => console.error('Connection error', err, err.stack));

    const list = event.values.map(val => val.values);

    client.query(queries.insertMany('gasmpg.mpg', event.values[0].columns, list))
        .then(res => callback(null, utils.copyObj(res.rows)))
        .catch(err => {
            console.error(err);
            callback(err, null);
        })
        .then(() => client.end())
}