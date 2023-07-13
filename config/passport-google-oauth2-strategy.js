const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
             //it's present in our google cloud
            clientID:"1019328606190-tg0fh32v9d3p484tqgvbv313518d00bv.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:8000/users/auth/google/callback"
    },//callback function
    //1. this access token is similar to that which we were generating before one is jwt accesstoken
    //similarly google also generates the access token  and give it to us
    //2.when accessToken expires then we use refresh token to get new access token ,we are not looking at them right now we will look them later
    //we will just do sign in and sign up
    function(accessToken,refreshToken,profile,done){
        //find a user
        //sir said emails have many thing we will see it in the next video
        //abi ase lelo ki emails[0].value first value hai email ki jo le rahein hai
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in google strategy-passport',err); return;}

            console.log(profile);

            if(user){
                //if found, set this user as req.user
                return done(null,user);
            }else{
                //if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){console.log('error in creating user google strategy-passport',err);return ;}

                    return done(null,user);
                });
            }

    });
}


));

module.exports = passport;