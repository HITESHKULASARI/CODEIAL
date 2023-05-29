const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
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

