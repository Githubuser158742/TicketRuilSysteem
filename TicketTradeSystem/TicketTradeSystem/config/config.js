"use strict";

var config = {
    HOST: 'http://localhost',
    PORT: getEnv('PORT') || 3000,
<<<<<<< HEAD
    MONGODBURL : process.env.MONGO_URI || 'mongodb://jim:abc123@ds058048.mongolab.com:58048/tts'
=======
    MONGODBURL : process.env.MONGO_URI || 'mongodb://hannes:abc123@ds058048.mongolab.com:58048/tts'
>>>>>>> origin/master
};

function getEnv(variable) {
    if (process.env[variable] === undefined) {
        if (variable === 'PORT') {
            return 1337
        };
        console.log('You must create an environment variable for ' + variable);
    }
    return process.env[variable];
};
module.exports = config;