var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Doctor = new Schema({
    username: String,
    password: String,
    role: String
});

Doctor.plugin(passportLocalMongoose);

module.exports = mongoose.model('doctors', Doctor);
