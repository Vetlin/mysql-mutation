const mysql = require('mysql2/promise');
const debug = require('./debug');

const DB = class {

    constructor(params) {
        this.params = params;
    }

    async connect() {
        this.db = await mysql.createConnection(this.params);
        return this;
    }

    async query(sql) {
        await this.db.execute(sql);
    }

}

module.exports = DB;