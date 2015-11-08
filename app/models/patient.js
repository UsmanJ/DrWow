var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Patient = new Schema({
    username: String,
    password: String,
    name: String,
    email: String,
    gender: String,
    age: String,
    address: String
});

Patient.plugin(passportLocalMongoose);

module.exports = mongoose.model('patients', Patient);

// .form-group
//     input.form-control(type='text', name="fullname", placeholder='Enter Name')
// .form-group
//     input.form-control(type='text', name="email", placeholder='Enter Email')
// .form-group
//     input.form-control(type='text', name="gender", placeholder='Enter Gender')
// .form-group
//     input.form-control(type='text', name="age", placeholder='Enter Age')
// .form-group
//     input.form-control(type='text', name="address", placeholder='Enter Address')
