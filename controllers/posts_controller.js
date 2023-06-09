const Post = require('../models/post');

module.exports.create = function(req,res){
    Post.create({
        //defining the values
        content: req.body.content,
        user : req.user._id,

        
        //it's allowing me to create this fucking property which in not present inside my postschema
        // although it's allowing me to create this  but it's not present in the database only those are present which are inside my schema 
        // rohan : req.user._id
    },function(err,post){
        if(err){
            console.log('error in creating a post'); return;}
            return res.redirect('back');
        }
    );
}