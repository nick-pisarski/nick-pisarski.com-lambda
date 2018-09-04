const {Client} = require('pg');
const config = require('../../config.json');


class DBClient {
    constructor(){
        this.client = new Client(config)
    }

    connect(){
        this.client.connect()
        .then(() => console.log('Connected to PostgreSQL database'))
        .catch(err => console.error('Connection error', err.stack));
    }

    query(query, callback){
        this.client.query(query)
        .then(res => callback(null, utils.copyObj(res.rows)))
        .catch(err => {
            console.error(err);
            callback(err, null);
        })
        .then(() => client.end())
    }
}

module.exports = DBClient;