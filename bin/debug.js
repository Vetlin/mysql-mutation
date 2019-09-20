const chalk = require('chalk');

const Debug = class {

    constructor(chalk) {
        this.c = chalk;
    }

    error(e) {
        this.log(this.c.red('ERROR: ' + e));
        process.exit(0)
    }

    success(m) {
        this.log(this.c.green(m))
    }

    info(m) {
        this.log(this.c.blue(m))
    }

    log(msg) {
        console.log('');
        console.log(msg)
    }

}

module.exports = new Debug(chalk);