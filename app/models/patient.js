var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Patient = new Schema({
    username: String,
    password: String
});

Patient.plugin(passportLocalMongoose);

module.exports = mongoose.model('patients', Patient);
