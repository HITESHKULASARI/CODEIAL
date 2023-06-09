const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
//for accessing the data base
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


// const MongoStore = require('connect-mongo')(session);
const MongoStore= require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    //from where do i pick up scss file to convert it in css
    src:'./assets/scss',
    //where do i need to put my css file
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'

}));



const flash = require('connect-flash');
//for reading through the post request
app.use(express.urlencoded());
//we have to tell the app to use it or use cokokie parser
app.use(cookieParser());
//for accessing the static files
app.use(express.static('./assets'));

app.use(expressLayouts);


//4th
app.set('view engine','ejs');
app.set('views','./views');

// app.use(session({
//     //name of the my cookie
//     name:'codeial',
//     //TODO change the secret befor deployment in production node
//     secret:'blahsomething',
//     saveUninitialized:false,
//     resave:false,
//     cookie:{
//         maxAge:(1000*60*100)
//     },
//     store:  MongoStore.create(
//         {
//             mongooseConnection:db,
//             autoRemove:'disabled'
//         },
//         function(err){
//             console.log(err||'connect-mongodb setup OK');
//         }
//     )

// }));

app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    //this is for storing cookie in the data base
    store: MongoStore.create(
        {
            
            mongoUrl: "mongodb://127.0.0.1:27017/session",
            autoRemove: 'disabled'
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
//whenever app get initialize passport also get initialize and this function is called this function is called to check 
//wheither session cookie is present or not so whenevr any request is comin in passport.setAuthenticatedUser and user will be set
//for locals and user should be accessible in your views 
app.use(passport.setAuthenticatedUser);

app.use(flash());
// app.use(customMware.setFlash);

//1st 
app.use('/',require('./routes'));






app.listen(port,function(err){
    if(err){
        console.log('we have error',err);

    }

    console.log('Server is running on the port:',port);
});

