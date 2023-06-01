const mongoose = require('mongoose');
console.log('1');
mongoose.connect('mongodb://127.0.0.1/codeial_development');
console.log('2');
const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connection to MongoDB"));
db.once('open',function(){
    console.log('connected to DataBase :: MongoDB');
});

module.exports = db;