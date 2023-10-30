//version 1
// require express
const express = require('express');
const port = 9000;
const app = express();
const path=require('path');

const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const db = require('./config/mongoose');

// require connect-flash
const flash = require('connect-flash');
const flashMiddleware = require('./config/flash');

// used for session cookies
const session = require("express-session");
const passport = require('passport');
const passportLocal = require('./config/passport_local');

const MongoStore = require('connect-mongo');



// layouts for ejs
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: false }));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(path.join(__dirname,'assets')));

//mongo store is used to store the session cookie
app.use(session({
    name: 'habitTracker',
    secret: "iLoveYou",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
            mongoUrl: 'mongodb://127.0.0.1:27017/habit_tracker',
            autoRemover: 'disabled'
        },
        function(err) {
            console.log("Error in the mongo-store");
        }
    ),
}));

// Using passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// flash middleware
app.use(flash());
app.use(flashMiddleware.setFlash);

// use express router
app.use('/', require('./routes'));

// directing the app in the given port
app.listen(port, function(err) {
    if (err) {
        console.log('Error', err);
        return;
    }
    console.log('Server is up and running on port: ', port);

});




//version 2
// const express=require('express');
// const app=express();
// const port=9000;
// const db = require('./config/mongoose')
// //set-up layout 
// const expressLayout = require('express-ejs-layouts');
// //models
// const HabitLists = require('./models/habit_list');
// //set-up view engine
// app.set('view engine','ejs');
// app.set('views','./views');
// app.use(expressLayout);
// app.use(express.urlencoded()) 
// //extracts scripts and styles from sub-pages into layout page
// app.set('layout extractStyles',true);
// app.set('layout extractSripts',true);
// app.use(express.static('./assets')) // for getting static


// //routes section
// app.use('/',require('./routes'))

// app.listen(port,function(err){
//     if(err){
//         console.log(`Error in running the server: ${err}`);
//     }
//     else{
//         console.log(`Server running at port: ${port}`);
//     }
// });





//const TodoLists = require('./models/todo_list')
// it is use to handle middle ware here we are using express.urlenceode to us e the parser
// app.use(express.urlencoded()) 
// app.use('/',require('./routes'))
