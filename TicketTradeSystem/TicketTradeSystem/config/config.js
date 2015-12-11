"use strict";

var config = {
    HOST: 'http://localhost',
    PORT: getEnv('PORT') || 3000,
    MONGODBURL : process.env.MONGO_URI || 'mongodb://localhost/TicketTradeSystemDB',
};

function getEnv(variable) {
    if (process.env[variable] === undefined) {
        if (variable == 'PORT') { return 1337 };
        console.log('You must create an environment variable for ' + variable);
    }
    return process.env[variable];
};
module.exports = config;