//var assert = require('assert');
var expect = require('chai').expect;
var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();
var mockgoose = require('mockgoose');

//describe('Test Suite 1', function() {
//    it('Test 1', function() {
//        assert.ok(true, "This shouldn't fail");
//    })

//    it('Test 2', function() {
//        assert.ok(1 === 1, "This shouldn't fail");
//        assert.ok(false, "This should fail");
//    })
//})


var Ticket = mongoose.model('Ticket', {
    _event: { type: Schema.ObjectId, ref: 'Event' },
    _user: { type: Schema.ObjectId, ref: 'User' },
    price: { type: Number },
    amount: { type: Number },
    createdOn: { type: Date, default: Date.now }
});

describe('Test add ticket', function (){
    it('should create ticket', function (done) {
        Ticket.create({
            _event: 1,
            _user: 1,
            price: 5,
            amount: 10,
        }, function (err) {
            done(err)
        })
    })
})



//beforeEach(function (done) {
//    mockgoose.reset();
//    Ticket.create({
//        _event: 1,
//        _user: 1,
//        price: 5,
//        amount: 10,
//    }, function (err, model) {
//        done(err);
//    });
//});

//afterEach(function (done) {
//    mockgoose.reset();
//    done();
//});

//describe('Tickets', function () {
//    before(function (done) {
//        mongoose.connect('mongodb://hannes:abc123@ds058048.mongolab.com:58048/tts', function (err) {
//            done(err)
//        })
//    })
    
//    it('should create ticket', function (done) {
//        Ticket.create({
//            _event: 1,
//            _user: 1,
//            price: 5,
//            amount: 10,
//        }, function (err) {
//            done(err)
//        })
//    })
    
//    it('should find ticket', function (done) {
//        Event.findOne({ _event: 1 }, function (err, ticket) {
//            expect(ticket._user).to.equal(1)
//            expect(ticket.price).to.equal(5)
//            expect(ticket.amount).to.equal(10)
//            done(err);
//        })
//    })
//})





