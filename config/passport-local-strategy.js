const passport = require('passport');


const localStrategy = require('passport-local').Strategy;


const User = require('../models/user');



// authentication using passport
//we are telling passport to use localstrategy
passport.use(new LocalStrategy({
    // we are defining the username field
    usernameField: 'email'
},
//here 'done' function is callback function which will call back to passport.js
//done function is used here if we fid the user or if we don't find the user or if we have any error
function(email,password,done){
     //find a user and establish the identity
     //{email-ye jo hai models mein jo present hai vo hai : email-ye value hai}
     // i think this 1st email is which is present in models and 2nd one is which is requested
     User.findOne({email:email},function(err,user){
        if(err){
            console.log('error in finding user --> passport');
            return done(err);
        }
        if(!user || user.password != password){
            console.log('Invalid Username/Password');
            //here first argument is null because it's for the error callback function first has error argument
            return done(null,false);
        }

        return done(null,user);

     });
}


));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    //we just wanting to store user.id encripted format ,set into the cookie
    done(null,user.id);
});
//on the other side cookie is sent to the browser,when the browser makes the request
//the broswer send back the user id so we have to deserialised it
//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user --> passport');
            return done(err);
        }

        return done(null,user);
    });
});

module.exports = passport;


