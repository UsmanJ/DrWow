// app/models/consultation.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ConsultationSchema   = new Schema({
    comments: String,
    prescription: String,
    date: { type: Date, default: Date.now },
    patientID: mongoose.Schema.Types.ObjectId,
    doctorID: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('consultation', ConsultationSchema);
