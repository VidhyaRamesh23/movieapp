var request = require('supertest');
var expect = require('chai').expect;
var sinon = require('sinon');


var model = require('../models/schemafav.js');
var model1 = require('../models/schema.js');

var app = require('../index.js');

var moviecontroller = require('../controller/moviecontroller');
var authencontroller = require('../controller/authenlogin');

var address = request("http://localhost:3000")
var modelStub = sinon.stub(model, 'find');
var modelStub1 = sinon.stub(model1, 'find');

describe('Test my moviecontroller', function(err) {

        it('should attempt to find movie in the favourite list', function(done) {
            address
                .get('/movie/view')
                
                .expect('Content-Type', /json/)
                .expect(200)
             
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });


describe('Test Add route', function(err) {

        it('should attempt to add movie in the favourite list', function(done) {
            address
                .post('/movie/add')
                
                .expect(200)
             
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });
    
    describe('Test favmovie details by moviename', function(err) {

    describe('Find movies in fav', function(err) {
        beforeEach(function() {
            modelStub.yields(null, [{
                'title': 'Ko'
            }]);
        });

        it('should attempt to find movie in the favourite list', function(done) {
            address
                .get('/movie/viewdetails')
                .expect(200)
              
                 .end(function(err, res) {

                    if (err) return done(err);
                    console.log(res.body);
                    expect(res.body[0].title).to.be.equal("Ko");
                    done();
                });
             
        });
    });

});