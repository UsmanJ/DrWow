var config = require('./config.global');

config.env = 'production';
config.hostname = 'http://drwhoteam.herokuapp.com/';
config.mongo.db = 'mongodb://admin:123makers@ds049864.mongolab.com:49864/drwow';

module.exports = config;
