var expect = require('chai').expect;
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
//mock database
mockgoose(mongoose);

var Ticket = mongoose.model('Ticket', {
    _event: { type: Schema.ObjectId, ref: 'Event' },
    _user: { type: Schema.ObjectId, ref: 'User' },
    price: { type: Number },
    amount: { type: Number },
    createdOn: { type: Date, default: Date.now }
});

beforeEach(function (done) {
    mockgoose.reset();
    Ticket.create({
        _event: 1,
        _user: 1,
        price: 5,
        amount: 10,
    }, function (err, model) {
        done(err);
    });
});

afterEach(function (done) {
    mockgoose.reset();
    done();
});




