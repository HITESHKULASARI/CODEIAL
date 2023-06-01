const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
//for accessing the data base
const db = require('./config/mongoose');
//for reading through the post request
app.use(express.urlencoded());
//we have to tell the app to use it or use cokokie parser
app.use(cookieParser());
//for accessing the static files
app.use(express.static('./assets'));

app.use(expressLayouts);
//1st 
app.use('/',require('./routes'));

//4th
app.set('view engine','ejs');
app.set('views','./views');




app.listen(port,function(err){
    if(err){
        console.log('we have error',err);

    }

    console.log('Server is running on the port:',port);
});

