var config = module.exports = {};

config.env = 'development';
config.hostname = 'dev.example.com';

//mongo database
config.mongo = {};
config.mongo.uri = process.env.MONGO_URI || 'localhost:8080 ';
config.mongo.db = 'mongodb://' + process.env.user + ':' + process.env.password + '@ds049864.mongolab.com:49864/drwow';
