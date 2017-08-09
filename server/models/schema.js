/*schema file for signup details*/
var mongoose = require('mongoose');


var Schema = mongoose.Schema({
    username: String,

    password: {
        type: String,
        unique: true
    },
});


var MyModel = mongoose.model('user', Schema);
module.exports = MyModel;