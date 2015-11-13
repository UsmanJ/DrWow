var config = require('./config.global');

config.env = 'production';
config.hostname = 'http://drwhoteam.herokuapp.com/';
config.mongo.db = 'mongodb://' + process.env.user + ':' + process.env.password + '@ds049864.mongolab.com:49864/drwow';

module.exports = config;
