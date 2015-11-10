

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    role: String,
    name: String,
    email: String,
    gender: String,
    age: String,
    address: String,
    gmcRef: String,
    username: String,
    password: String
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('accounts', Account);
