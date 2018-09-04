const MPG = require('./models/mpg');

const DBClient = require('../db/client');
const queries = require('../utils/pgsql');

exports.getListOfMPGS = (event, context, callback) => {
    try {
        const client = new DBClient();
        client.connect();
        client.query(queries.select('gasmpg.mpg'))
            .then((res) => callback(null, res.rows))
            .catch(err => callback(err, null))
            .then(() => client.close())
    } catch (error) {
        callback(error, null)
    }
}

exports.postOneMPG = (event, context, callback) => {
    try {
        const model = new MPG(event.miles, event.gallons, event.total, event.notes);
        model.validate();

        const client = new DBClient();
        client.connect();

        client.query(queries.insert('gasmpg.mpg', model.columns, model.values))
            .then(res => callback(null, res.rows))
            .catch(err => callback(err, null))
            .then(() => client.close())

    } catch (error) {
        callback(error, null)
    }
}

// WIP
exports.postManyMPGs = (event, context, callback) => {
    const client = new DBClient();
    client.connect();

    const list = event.values.map(val => val.values);

    client.query(queries.insertMany('gasmpg.mpg', event.values[0].columns, list))
        .then(res => callback(null, res.rows))
        .catch(err => callback(err, null))
        .then(() => client.close())
}