const User = require('../models/user');
//3rd
module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render('user_profile',{
                    title:"User Profile",
                    user:user
                })
            }else{
                return res.redirect('/users/sign-in');
            }
        });
    }else{
        return res.redirect('/users/sign-in');
    }
}

module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title:"codial | sign up"
    });
}

module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title:"codial | sign in"
    });
}

module.exports.create = function(req,res){
   if(req.body.password != req.body.confirm_password){
     return res.redirect('back');
   }
   //we will try to find the user with the smae emailid because the email has to be unique 
   //first we have to import model users
   User.findOne({email:req.body.email},function(err,user){
    if(err){
        console.log('error in finding user in signing up');
        return;
    }
    if(!user){
        User.create(req.body,function(err,user){
            if(err){
                console.log('error in finding user in signing up');
                return;
            }
            return res.redirect('/users/sign-in');
        })
    }else{
        //if user not found
        return res.redirect('/users/sign-in');
    }
   });
}

module.exports.createSession = function(req,res){
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('error in finding the user while sign-in');
            return ;
        }
        //handle user found
        if(user){
          // handle password which does'nt match
          if(user.password != req.body.password){
            return res.redirect('back');
          }
          //handle session creation
          res.cookie('user_id',user.id);
          return res.redirect('/users/profile');
        }else{
            return res.redirect('back');
        }
    });
}