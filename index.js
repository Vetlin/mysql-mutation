const model = require('./bin/model');

const Mutation = class {

    constructor(config) {
        new model(config, process.env.npm_config_clear);
    }

}

module.exports = Mutation;