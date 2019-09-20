const debug = require('./debug');

const Validator = class {

    validate(config) {

        if (!config.host || !config.user) debug.error('Missing required parameters - user, host');

        if (!config.password && config.password !== '') debug.error('Missing required parameter - password');

        if (!config.name) debug.error('Missing required parameter - name. Please set up database name!');
        else if (typeof config.name !== 'string') debug.error('Database name should be string');

        if (config.tables) {
            if (typeof config.tables !== 'object') debug.error('Tables option shold be object!');
            for (let key in config.tables) {
                this.validateTable(key, config.tables[key]);
            }
        }

        return true;
    }

    validateTable(name, obj) {
        if (!obj.rows) debug.error(`Table ${name} should have \'rows\' option`)
    }

}

module.exports = new Validator();