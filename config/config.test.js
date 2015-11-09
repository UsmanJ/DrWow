var config = require('./config.global');

config.env = 'test';
config.hostname = 'localhost';
config.mongo.db = 'mongodb://admin:123makers@ds049864.mongolab.com:49854/drwowtest';

module.exports = config;
