const User = require('../models/user');
//3rd
module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: 'profile'
    });
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
    //todo later
}