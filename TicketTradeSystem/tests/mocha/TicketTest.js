var chai = require('chai');
var should = chai.should();
var expect = chai.expect();
var mongoose = require('mongoose');
var request = require('superagent');
var server = request.agent();

var config = require('../../config/config.js')
var Ticket = require('../../data/models/ticket');
var db;
var codeToTest = require('../../data/models/ticketsRepo');

describe('tickets', function () {
    before(function (done) {
        db = mongoose.connect(config.TESTMONGO);
        done();
    });
});