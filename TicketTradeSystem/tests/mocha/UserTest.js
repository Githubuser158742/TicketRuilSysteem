var expect = require('chai').expect;
var mongoose = require('mongoose');
var request = require('superagent');
var server = request.agent();

var config = require('../../config/config.js');
var User = require('../../data/models/user');
var db;

describe('create + login', function () {
    before(function (done) {
        db = mongoose.connect(config.TESTMONGO);
        done();
    });

    beforeEach(function (done) {
        var user = new User( {
            local : {
                email: 'test@test.com',
                password: 'test',
                firstname: 'test',
                name: 'test',
                street: 'test',
                number: 'test',
                phone: 'test',
                zip: 'test',
                city: 'test'
            }
        });
        user.save(function (err) {
            if (err) console.log('error' + err.message);
            else console.log('no error saving test@test.com');
        });
        done();
    });
    
    it('find user by email', function (done) {
        User.findOne({'local.email': 'test@test.com'}, function (err, user) {
            expect(user.local.email).to.equal('test@test.com');
            done();
        });       
    });
    
    afterEach(function (done) {
        User.remove({ 'local.email': 'test@test.com' }).exec();
        mongoose.connection.db.dropDatabase();
        done();
    });
    
    after(function (done) {
        mongoose.connection.close();
        done();
    });


});
