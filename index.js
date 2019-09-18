const mutation = require('./mutation');

if (process.env.npm_config_clear) {
    mutation.clear().then(() => {
        mutation.run();
    })
} else {
    mutation.run();
}

