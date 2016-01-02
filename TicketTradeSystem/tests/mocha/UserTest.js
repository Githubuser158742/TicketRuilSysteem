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
            expect(user.local.email).toEqual('test@test.com');
        });
        done();
    });
    
    it('login', function (done) {
        server
            .post('http://localhost:1337/login')
            .send({ user: 'test@test.com', password: 'test' })
            .end(function (err, res) {
            expect(res.statusCode).toEqual(302);
            expect(res.body.success).toEqual(true);
        });
        done();

    });
    
    it('signup', function (done) {
        server
            .post('http://localhost:1337/signup')
            .send({ user: 'test2@test.com', password: 'test2' })
            .end(function (err, res) {
            expect(res.statusCode).toEqual(302);
        });
        done();
    });
    
    afterEach(function (done) {
        User.remove({ 'local.email': 'test@test.com' }).exec();
        User.remove({ 'local.email': 'test2@test.com' });
        done();
    });
    
    after(function (done) {
        mongoose.connection.close();
        done();
    });


});
