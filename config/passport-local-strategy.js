// const passport = require('passport');


// const LocalStrategy = require('passport-local').Strategy;


// const User = require('../models/user');





// // authentication using passport
// //we are telling passport to use localstrategy
// passport.use(new LocalStrategy({
//     // we are defining the username field
//     //how will i detect a user so for that i will use this field
//     usernameField: 'email'
// },
// //here 'done' function is callback function which will call back to passport.js
// //done function is used here if we find the user or if we don't find the user or if we have any error
// //this is callback function also and this is inbuilt to passport 
// //whenever this localstrategy function is called this function will
// //be called and these all are passed on email,password,done i
// function(email,password,done){
//      //find a user and establish the identity
//      //{email-ye jo hai models mein jo present hai vo hai : email-ye value hai}
//      // i think this 1st email is which is present in models and 2nd one is which is requested
//      //first email is that which  is present inside models scehma another email is the value which is passed on from the line number 25
//     //  User.findOne({email:email},function(err,user){
// //         if(err){
// //             console.log('error in finding user --> passport');
// //             return done(err);
// //         }
// //         if(!user || user.password != password){
// //             console.log('Invalid Username/Password');
// //             //here first argument is null because it's for the error callback function first has error argument
// //             return done(null,false);
// //         }

// //         return done(null,user);

// //      });
// // }
//             User.findOne({ email: email })
//             .then((user) => {
//             if (!user || user.password != password) {
//                 req.flash('error','invalid username/password');
//                 return done(null, false);
//             }

//             return done(null, user);
//             })

//             .catch((err) => {
//             req.flash('error', err);
//             return done(err);
//             })
//             }


// ));

// // serializing the user to decide which key is to be kept in the cookies
// //done is callback function
// passport.serializeUser(function(user,done){
//     //we just wanting to store user.id encripted format ,set into the cookie
//     //this automatically set user in encripted format 
//     done(null,user.id);
// });
// //on the other side cookie is sent to the browser,when the browser makes the request
// //the broswer send back the user id so we have to deserialised it
// //deserializing the user from the key in the cookies
// passport.deserializeUser(function(id,done){
//     User.findById(id,function(err,user){
        
//         if(err){
//             console.log('Error in finding user --> passport');
//             return done(err);
//         }

//         return done(null,user);
//     });
// });


// //check if the user is authenticated

// passport.checkAuthentication = function(req,res,next){
//     //if the user is signed in,the pass on the request to the next function (controller's action)
//     if(req.isAuthenticated()){
//         //it will call the next function
//         return next();
//     }
//     //if the user is not signed in
//     return res.redirect('/users/sign-in');
// }

// passport.setAuthenticatedUser = function(req,res,next){
//     if(req.isAuthenticated()){
//         //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the
//         //views
//         res.locals.user = req.user;
//     }
//     //i am using next here because it's a middleware and i want to send it to the next task in index else it will remain stuck here
//     next();
// }
// module.exports = passport;


const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// authintication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
},
    function (req, email, password, done) {
        
        User.findOne({ email: email })
            .then((user) => {
                if (!user || user.password != password) {
                    req.flash('error','invalid username/password');
                    return done(null, false);
                }
                req.flash('you are logged in');
                return done(null, user);
            })

            .catch((err) => {
                req.flash('error', err);
                return done(err);
            })
    }
));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null,user.id);
})


// deserialize the user from the key in cookies
passport.deserializeUser(function(id, done){
    User.findById(id)
    .then((user)=>{
        return done(null, user);
    })

    .catch((err)=>{
        console.log("Error in finding user ---> passport");
        return done(err);
    })
})

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    //it's present in passport.js and isAuthenticated is the function 
    if(req.isAuthenticated()){
        return next();
    }
    // if the user not signed in 
    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}
module.exports = passport;

