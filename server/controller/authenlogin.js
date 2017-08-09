var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/schema');
var bCrypt = require('bcrypt-nodejs');

/*saving sign up details  in the database*/
var user = {
    signup: function(req, res) {
        
        var newUser = new User({
            username: req.body.username,
            password: req.body.password
        });

        newUser.save().then((doc) => {
            res.send(doc);
        }, (err) => {
            console.log(err);
            res.send(err);
        });
    },
    /*login*/
    login: function(req, res, next) {
        //console.log(req.body.username);
        res.json({
            responseText: 'authenticated'
        });
        
    },
    /*logout*/
    logout: function(req, res, next) {
        req.session.destroy(function(err) {
            if (err) {
                 console.log(err);
            } else {
                 console.log(err);
                res.send("success");
            }
        });
    },

}
module.exports = user;
