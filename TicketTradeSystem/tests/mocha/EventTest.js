var expect = require('chai').expect;
var mongoose = require('mongoose');
var request = require('superagent');
var server = request.agent();

var config = require('../../config/config.js')
var Event = require('../../data/models/event');
//var Ticket = require('../../data/models/ticket');
var db;
var codeToTest = require('../../data/models/eventsRepo');

describe('events', function () {
    before(function (done) {
        db = mongoose.connect(config.TESTMONGO);
        done();
    });
    
    beforeEach(function (done) {
        //var ticket = new Ticket({
        //    _event: "56814c6166423ee432e26780",
        //    _user: "56810ccd4db438a8399e474b",
        //    price: 10,
        //    amount: 20
        //});
        //ticket.save(function (err) {
        //    if (err) console.log('error' + err.message);
        //    else console.log('no error saving ticket');
        //});
        var event = new Event({
            _id: "56814d90ed2c4e900fb3c7e9",
            name: "Feestelijkheden",
            date: Date.now,
            userId: "56810ccd4db438a8399e474b",
            //tickets: []
        });
        codeToTest.createEvent(event, function (err) {
        //event.save(function (err) {
            if (err) console.log('error' + err.message);
            else console.log('no error saving event');
        });
        done();
    });
    
    it('find event by id', function (done) {
        codeToTest.getEventByID("56814d90ed2c4e900fb3c7e9", function (err, event) {
            expect(event).to.not.be.empty;
            done();
        });
    });
    
    //it('find no tickets by userid', function (done) {
    //    codeToTest.getTicketsByIdUser("56810ccd4db438a8399e474c", function (err, ticketsuser) {
    //        expect(ticketsuser).to.be.empty;
    //        done();
    //    });
    //});
    
    afterEach(function (done) {
        Event.remove({ '_id': "56814d90ed2c4e900fb3c7e9" }).exec();
        done();
    });
    
    after(function (done) {
        mongoose.connection.close();
        done();
    });
});