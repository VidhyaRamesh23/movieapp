var mongoose = require("mongoose");
var Favmovdetails = require('../models/schemafav.js')
var request = require('request');

var movielist = {
    /*searching films*/
    search: function(req, res, next) {
        var moviename = req.params.index;
        request.get('https://api.themoviedb.org/3/search/movie?api_key=7aebafe32b82c7ee36fd33d30d8491a1&language=en-US&query=' + moviename + '&page=1&include_adult=false', function(err, response, body, data) {

            if (response.statusCode == 200) {

                res.json(JSON.parse(response.body));
            } else {
                res.send("error");
            }
        });

    },
    /*favorite films added in the database*/
    add: function(req, res, next) {
        
        var favmovie = {
            title: req.body.movie,
            poster: req.body.movieposter,
            release_date: req.body.release_date,
            username: req.body.username

        }
        Favmovdetails.findOne({
            title: favmovie.title,
            username: favmovie.username
        }, function(err, data) {
            if (data == null) {
                var db1 = new Favmovdetails(favmovie);
                //saves only the new data in database
                db1.save().then((doc) => {
                    res.send("success");
                }, (err) => {
                    res.send(err);
                });
            } else {
                res.send("already added");
            }
        });
    },
    /*displaying favourite films with respect to each user*/
    view: function(req, res, next) {
        Favmovdetails.find({
            username: req.query.username
        }, function(err, data) {
            if (err) {

                throw err;
            } else {
                res.send(data);
            }

        });

    },
    /*displaying favourite films*/
    viewdetails: function(req, res, next) {
        Favmovdetails.find(function(err, data) {
            if (data == null) {
                res.send(err);
            } else {
                res.send(data);
            }

        });
    },
    /*movie will be deleted by the title name*/
    delete: function(req, res, next) {
        var title = req.query.movie;
        //console.log(title);
        Favmovdetails.remove({
            title: title,
            username: req.query.username

        }, function(err, data) {
            if (err)
                throw err;
            else {
                //console.log(data);
                res.send("success");
            }

        });
    }
}
module.exports = movielist;