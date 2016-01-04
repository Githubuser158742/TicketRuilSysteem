var expect = require('chai').expect;
var mongoose = require('mongoose');
var request = require('superagent');
var server = request.agent();
var config = require('../../config/config.js')
var Ticket = require('../../data/models/ticket');
var Event = require('../../data/models/event');
var User = require('../../data/models/user');
var db;
var codeToTest = require('../../data/models/ticketsRepo');

describe('tickets', function () {
    before(function (done) {
        //Tests worden uitgevoerd op lokale mongodb
        db = mongoose.connect(config.TESTMONGO);
        done();
    });

    beforeEach(function (done) {
        var user = new User({
            _id: "56810ccd4db438a8399e474b",
            local : {
                email: 'test@test.com',
                password: 'test',
                firstname: 'test',
                lastname: 'test',
                street: 'test',
                number: 'test',
                phone: 'test',
                zip: 'test',
                city: 'test'
            }
        });
        user.save(function (err) {
            if (err) console.log('error', err.message);
            else console.log('no error saving user');
        });
        var event = new Event({
            _id: "56814c6166423ee432e26780",
            name: "Feestelijkheden",
            description: "hupla",
            date: "2016-01-18",
            time: "00:00",
            location: "Howest",
            city: "Kortrijk",
            price: 0,
            pictureUrl: "https://www.brockport.edu/career/images/GraduateSchoolTests.jpg",
            userId: "56810ccd4db438a8399e474b",
            eventCancelled: false,
            tickets: [],
            tags: []
        });
        event.save(function (err) {
            if (err) console.log('error', err.message);
            else console.log('no error saving event');
        });
        var ticket = new Ticket({
            _id: "567d6c01937e3d6c4817d69e",
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
    
    it('get all tickets', function (done) {
        codeToTest.getAllTickets(function (err, tickets) {
            expect(tickets).to.not.be.empty;
            expect(tickets[0].price).to.equal(10);
            expect(tickets[0].amount).to.equal(20);
            expect(tickets[0]._user.local.firstname).to.equal('test');
            expect(tickets[0]._event.name).to.equal('Feestelijkheden');
            done();
        });
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
        var event = new Event({
            _id: "56814c6166423ee432e26781",
            name: "Feestelijkheden",
            description: "hupla",
            date: "2016-01-18",
            time: "00:00",
            location: "Howest",
            city: "Kortrijk",
            price: 0,
            pictureUrl: "https://www.brockport.edu/career/images/GraduateSchoolTests.jpg",
            userId: "56810ccd4db438a8399e474b",
            eventCancelled: false,
            tickets: [],
            tags: []
        });
        
        var ticket = new Object({
            eventid: "56814c6166423ee432e26781",
            userid: "56810ccd4db438a8399e474b",
            price: 20,
            amount: 30
        });
        
        codeToTest.createTicket(ticket, event, function (err) {
            if (err) {
                console.log('error' + err.message);
            }
            else {
                console.log('no error saving ticket');
            }
        });
        done();      
    });
    
    it('check created ticket', function (done) {
        codeToTest.getTicketsByIdUser("56810ccd4db438a8399e474b", function (err, ticketsuser) {
            expect(ticketsuser).to.not.be.empty;
            expect(ticketsuser[0].price).to.equal(10);
            expect(ticketsuser[0].amount).to.equal(20);
            expect(ticketsuser[1].price).to.equal(20);
            expect(ticketsuser[1].amount).to.equal(30);
            done();
        });
    });
    
    it('drop created ticket', function (done) {
        Ticket.remove({ '_event': "56814c6166423ee432e26781" }).exec();
        Event.remove({ '_id': "56814c6166423ee432e26781" }).exec(); 
        done();
    });

    afterEach(function (done) {
        User.remove({ '_id': "56810ccd4db438a8399e474b" }).exec();
        Ticket.remove({ '_id': "567d6c01937e3d6c4817d69e" }).exec();
        Event.remove({ '_id': "56814c6166423ee432e26780" }).exec();                          
        //mongoose.connection.db.dropDatabase();
        done();
    });
    
    after(function (done) {
        mongoose.connection.close();
        done();
    });
});