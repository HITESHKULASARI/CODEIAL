// const User = require('../models/user');

// module.exports.profile = function(req,res){
//     console.log('hello1');
//     if(req.cookies.user_id){
//         console.log('hello2');
//         console.log(req.cookies.user_id);
//         User.findById(req.cookies.user_id,function(err,user){
//             console.log('hello3');
//             console.log(user);
//             if(user){
//                 console.log('hello4');
//                 return res.render('user_profile',{
//                     title:"User Profile",
//                     user:user
//                 });
//             }else{
//                 console.log('hello5');
//                 return res.redirect('/users/sign-in');
//             }
//         });
//     }else{
//         console.log('hello6');
//         return res.redirect('/users/sign-in');
//     }
    
// }
// module.exports.profile = async function(req, res) {
//     try {
//       if (req.cookies.user_id) {
//         const user = await User.findById(req.cookies.user_id);
        
//         if (user) {
//           return res.render('user_profile', {
//             title: 'User Profile',
//             user: user
//           });
//         }
        
//         return res.redirect('/users/sign-in');
//       } else {
//         return res.redirect('/users/sign-in');
//       }
//     } catch (error) {
//       console.log('Error:', error);
//       return res.redirect('/users/sign-in');
//     }
//   };

// // render the sign up page
// module.exports.signUp = function(req,res){
//     if(req.isAuthenticated()){
//         return res.redirect('/users/profile');
//     }
//     return res.render('user_sign_up',{
//         title:"codial | sign up"
//     });
// }

// //render the sign in page
// module.exports.signIn = function(req,res){
//     if(req.isAuthenticated()){
//         return res.redirect('/users/profile');
//     }
//     return res.render('user_sign_in',{
//         title:"codial | sign in"
//     });
// }

// //get the sign up data
// module.exports.create = function(req,res){
//    if(req.body.password != req.body.confirm_password){
//      return res.redirect('back');
//    }
//    //we will try to find the user with the smae emailid because the email has to be unique 
//    //first we have to import model users
//    User.findOne({email:req.body.email},function(err,user){
//     if(err){
//         console.log('error in finding user in signing up');
//         return;
//     }
//     if(!user){
//         User.create(req.body,function(err,user){
//             if(err){
//                 console.log('error in finding user in signing up');
//                 return;
//             }
            
//             return res.redirect('/users/sign-in');
//         })
//     }else{
//         //if user not found
//         return res.redirect('back');
//     }
//    });
// }


// // sign in and create a session for the user
// module.exports.createSession = function(req,res){
//     // User.findOne({email: req.body.email},function(err,user){
//     //     if(err){
//     //         console.log('error in finding the user while sign-in');
//     //         return ;
//     //     }
//     //     //handle user found
//     //     if(user){
//     //       // handle password which does'nt match
//     //       if(user.password != req.body.password){
//     //         return res.redirect('back');
//     //       }
//     //       //handle session creation
//     //       //we set the cookie with user id
//     //       res.cookie('user_id',user.id);
//     //       return res.redirect('/users/profile');
//     //     }else{
//     //         return res.redirect('back');
//     //     }
//     // });
   
//     return res.redirect('/');
// }

const User = require('../models/user');

const fs = require('fs');// file system librarry
const path = require('path');

module.exports.profile = function (req, res) {
    User.findById(req.params.id)
        
        .then((user) => {
            console.log(req.params.id,'hihj');
            return res.render('user_profile', {
                title: "user profile",
                profile_user: user

            });
        })
        .catch ((error) => {
                  console.log('Error:', error);
                  return res.redirect('/');
                });
    // return res.render('user_profile', {
    //                 title: "user profile",
    //                 profile_user: User
    
    //             });
    
}


//update the user info
module.exports.update = async function (req, res) {

    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function (err) {
                if (err) { console.log('*****Multer err: ', err) };

                // console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;

                if (user.avatar) {
                    console.log("dir file exist before unlink : ", fs.existsSync(path.join(__dirname, '..', user.avatar)))
                    // if file or path exist
                    if (fs.existsSync(path.join(__dirname, '..', user.avatar))) {
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }

                }
                //if request has file
                if (req.file) {
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }

                //when you use user.name= req.body.name then need to save() in db 
                user.save();

                req.flash('success', 'User profile Updated..')
                return res.redirect('back');
            })
        } catch (err) {
            req.flash('error', err);
            return res.redirect('back');
        }
    } else {
        req.flash('error', 'unauthorized..')
        return res.status(401).send('Unauthorized');
    }

}

// render the sign up page
module.exports.signup = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_signup', {
        title: "sign up"
    })
}

// render the sign in page
module.exports.signin = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_signin', {
        title: "sign in"
    })
}

//creating the user
module.exports.create = async function (req, res) {

    try {
        if (req.body.password != req.body.confirm_password) {
            console.log("password and confirm_password not matches ");
            return res.redirect('back');
        }

        let user = await User.findOne({ email: req.body.email })//find the user by email
        // if user not found
        if (!user) {
            // create new user
            await User.create(req.body)
            return res.redirect('/users/sign-in');
        } else {
            // return to back or sign-in page
            return res.redirect('back');
        }
    } catch (err) {
        return console.log("Error", err);
    }

}


module.exports.createSession = (function (req, res) {
    req.flash('success', 'successfully logged in');
    console.log('connected');
    return res.redirect('/');
});

// used logout and destroy session
module.exports.destroySession = function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }

        req.flash('success', 'You have logged out !');
        return res.redirect('/');
    });

}