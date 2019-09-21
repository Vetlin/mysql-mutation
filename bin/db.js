const mysql = require('mysql2/promise');

const DB = class {

    async connect(params) {
        this.db = await mysql.createConnection(params);
        return this;
    }

    async query(sql) {
        await this.db.execute(sql);
    }

}

module.exports = new DB();