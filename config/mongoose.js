//require the library
const mongoose = require('mongoose');

//connect to the database
// 'mongodb://127.0.0.1:27017/habit_tracker'
mongoose.connect(process.env.MONGODB_URI);

//acquire the connection(to check if it's successful)
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console,"error connecting to db") );

//up and running then print the message
db.once('open', function() {
  
    console.log("Successfully connected to the database");

});

module.exports=db;


// NglDU4QWWJ2Wp012