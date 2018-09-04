const {
    Client
} = require('pg');
const config = require('../../config.json');
const {MPG} = require('./models');
const {insert, insertMany, select} = require('../utils/pgsql');

const utils = require('../utils/utils');

exports.getListOfMPGS = (event, context, callback) => {
    const client = new Client(config);
    client.connect()
        .then(() => console.log('Connected to PostgreSQL database'))
        .catch(err => console.error('Connection error', err.stack));

    const query = select('gasmpg.mpg');

    client.query(query)
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
    const query = insert('gasmpg.mpg', model.columns, model.values);
    client.query(query)
        .then(res => callback(null, utils.copyObj(res.rows)))
        .catch(err => {
            console.error(err);
            callback(err, null);
        })
        .then(() => client.end())
}

// exports.postManyMPGs = (event, context, callback) => {
//     const client = new Client(config);
//     client.connect()
//         .then(() => console.log('Connected to PostgreSQL database'))
//         .catch(err => console.error('Connection error', err, err.stack));
//     const list = event.values.map(val => val.values)
//     const query = insertMany('gasmpg.mpg', event.values[0].columns, list)
//     client.query(query)
//         .then(res => callback(null, utils.copyObj(res.rows)))
//         .catch(err => {
//             console.error(err);
//             callback(err, null);
//         })
//         .then(() => client.end())
// }