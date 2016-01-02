var expect = require('chai').expect;
var mongoose = require('mongoose');
var request = require('superagent');
var server = request.agent();

var config = require('../../config/config.js')
var Ticket = require('../../data/models/ticket');
var Event = require('../../data/models/event');
var db;
var codeToTest = require('../../data/models/ticketsRepo');

describe('tickets', function () {
    before(function (done) {
        db = mongoose.connect(config.TESTMONGO);
        done();
    });

    beforeEach(function (done) {
        //var event = new Event({
        //    name: "Feestelijkheden",
        //    date: Date.now,
        //    userId: "56810ccd4db438a8399e474b",
        //});
        //event.save(function (err) {
        //    if (err) console.log('error', err.message);
        //    else console.log('no error saving event');
        //});
        var ticket = new Ticket({
            _event: "56814c6166423ee432e26780",
            _user: "56810ccd4db438a8399e474b",
            price: 10,
            amount: 20
        });
        ticket.save(function (err) {
            if (err) console.log('error' + err.message);
            else console.log('no error saving ticket');
        });
        done();
    });

    it ('find tickets by userid', function (done){
        codeToTest.getTicketsByIdUser("56810ccd4db438a8399e474b", function (err, ticketsuser) {
            expect(ticketsuser).to.not.be.empty;
            expect(ticketsuser[0].price).to.equal(10);
            expect(ticketsuser[0].amount).to.equal(20);
            done();
        });
    });

    it('find no tickets by userid', function (done) {
        codeToTest.getTicketsByIdUser("56810ccd4db438a8399e474c", function (err, ticketsuser) {
            expect(ticketsuser).to.be.empty;
            done();
        });
    });
    
    it('create ticket', function (done) {
        
    });

    afterEach(function (done) {
        Ticket.remove({'_user': "56810ccd4db438a8399e474b"}).exec();
        done();
    });
    
    after(function (done) {
        mongoose.connection.close();
        done();
    });
});