const {
    Client
} = require('pg');
const config = require('../../config.json');
const utils = require('../utils/utils')

class DBClient {
    constructor() {
        this.client = new Client(config)
    }

    connect() {
        this.client.connect()
            .then(() => console.log('Connected to PostgreSQL database'))
            .catch(err => console.error('Connection error', err.stack));
    }

    query(query) {
        return this.client.query(query)
    }
    
    close() {
        this.client.end();
    }
}

module.exports = DBClient;