const debug = require('./debug');
const DB = require('./db');
const validator = require('./validator');

const Model = class {

    constructor(config, clear) {

        this.execute(config, clear);

    }

    async execute(config, clear) {

        // Validate user params
        validator.validate(config);

        this.config = config;

        // DB initialization
        let db = new DB({
            host: this.config.host,
            user: this.config.user,
            password: this.config.password,
        });

        this.db = await db.connect();

        if (clear) {
            await this.clear();
        }

        this.run();

    }

    async run() {
        const config = this.config;
        await this.createDatabase(config.name);

        // Create tables
        for(let tableName in config.tables) {
            let tableObj = config.tables[tableName];
            await this.createTable(config.name, tableName, tableObj)
            if (config.autofill && config.autofill[tableName]) {
                this.tableAutofill(config.name, tableName, config.autofill[tableName]);
            }
        }

    }

    async createDatabase(name) {
        await this.db.query(`CREATE DATABASE IF NOT EXISTS ${name};`);
        debug.success(`Database ${name} has been created!!!`)

    }

    async clear() {
        await this.db.query(`DROP DATABASE ${this.config.name}`);
    }

    async createTable(db_name, name, obj) {
        if (!obj.engine) {
            obj.engine = 'InnoDB'
        }
        if (!obj.charset) {
            obj.charset = 'utf8'
        }

        let sql = `CREATE TABLE ${db_name}.${name} (`;

        let sql_arr = []
        let primaryKey = '';
        for(let key in obj.rows) {
            let result = this.getRowSql(key, obj.rows[key])
            if (result.pk !== ''){
                primaryKey = result.pk
            }
            sql_arr.push(result.r);
        }
        sql += sql_arr.join(', ')

        sql += `${primaryKey}) ENGINE=${obj.engine} DEFAULT CHARSET=${obj.charset}`
        await this.db.query(sql);
        debug.info(`Table ${name} has been created`)
    }

    getRowSql(key, obj) {
        if (!obj.type || !obj.length) {
            this.error('Not enougth params');
        }

        let typeLength = `${obj.type}(${obj.length})`;
        if (obj.type === 'timestamp'){
            typeLength = 'timestamp'
        }

        let notNull = 'NOT NULL ';
        if (obj.null) {
            notNull = '';
        }
        let defaultValue = '';
        if (obj.default === 'CURRENT_TIMESTAMP') {
            defaultValue = 'DEFAULT CURRENT_TIMESTAMP '
        }
        let autoIncrement = '';
        if (obj.auto_increment){
            autoIncrement = 'AUTO_INCREMENT '
        }
        let primaryKey = ''
        if (obj.primary_key){
            primaryKey = `,PRIMARY KEY (${key})`
        }
        return {pk: `${primaryKey}`, r: `${key} ${typeLength} ${notNull}${defaultValue}${autoIncrement}`}
    }

    tableAutofill(db_name, table_name, arr) {

        let keys_arr = [], values_arr = [];
        for (let i = 0; i < arr.length; i++) {
            values_arr[i] = [];
            for(let key in arr[i]) {
                if (i === 0) {
                    keys_arr.push(key);
                }
                values_arr[i].push(`"${arr[i][key]}"`);
            }
        }

        for(let i = 0; i < values_arr.length; i++) {
            values_arr[i] = values_arr[i].join(', ');
        }
        this.db.query(`INSERT INTO ${db_name}.${table_name} (${keys_arr.join(', ')}) VALUES (${values_arr.join('), (')})`, er => {
            console.log(`AUTOFILL ${table_name} complete!`)
        })
    }

}

module.exports = Model;