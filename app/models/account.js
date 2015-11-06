// // app/models/user.js
//
// var mongoose     = require('mongoose');
// var Schema       = mongoose.Schema;
// var passportLocalMongoose = require('passport-local-mongoose')
//
// var UserSchema   = new Schema({
//     name: String,
//     password: String
// });
//
// UserSchema.plugin(passportLocalMongoose);
//
// module.exports = mongoose.model('user', UserSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    password: String
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('accounts', Account);
