const model = require('./bin/model');
const validator = require('./bin/validator');

const Mutation = class {

    constructor(config) {

        // Validate user params
        validator.validate(config);

        this.config = config;
    }

    run() {
        model.execute(this.config, process.env.npm_config_clear);
    }

}

module.exports = Mutation;