const mysql = require('mysql');
const chalk = require('chalk');
const config = require('./config');

const Mutation = class {
    
    constructor(config) {

        if (!config.host || !config.user) {
            this.error('There are no required parameters for connecting to the database');
        }
        if (!config.password && config.password !== '') {
            this.error('There are no required parameters for connecting to the database');
        }

        this.config = config;
    }

    connect(params){
        return new Promise((resolve, reject) => {
            this.db = mysql.createConnection(params);
            this.db.connect(er => {
                if (er) this.error(er.sqlMessage);
                resolve(true)
            });
        });
    }

    run() {

        const config = this.config

        this.connect({
            host: config.host,
            user: config.user,
            password: config.password,
        }).then(() => {

            // Create database
            this.createDatabase(config.name).then(() => {

                // Create tables
                for(let tableName in config.tables) {
                    let tableObj = config.tables[tableName];
                    this.createTable(config.name, tableName, tableObj).then(() => {

                        // Autofill
                        if (config.autofill && config.autofill[tableName]) {
                            this.tableAutofill(config.name, tableName, config.autofill[tableName]);
                        }

                    })
                }

            }).catch(e => {
                this.error(e);
            })

        }).catch(e => {
            this.error(e);
        })

    }

    clear() {
        return new Promise((resolve, reject) => {
            this.db.query(`DROP DATABASE ${this.config.name}`, er => {
                resolve(true);
            })
        })
    }

    createDatabase(name) {
        return new Promise((resolve, reject) => {
            if (typeof name === 'string') {
                this.db.query(`CREATE DATABASE IF NOT EXISTS ${name};`, er => {
                    if (er) reject(er);

                    console.log(chalk.green(`Database '${config.name}' has been created`));
                    console.log('');

                    resolve(true);
                });
            } else {
                reject(`Database name should be string, not the ${typeof name}`);
            }
        })
    }

    createTable(db_name, name, obj) {
        return new Promise((resolve, reject) => {

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
            this.db.query(sql, er => {
                if (er) this.error(er.sqlMessage);
                console.log(chalk.blue(`Table ${tableName} has been created`));
                resolve(true);
            })
        })
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

    error(e) {
        console.log(chalk.red('ERROR: '+e));
        console.log('');
        process.exit(0);
    }

}

module.exports = new Mutation(config)