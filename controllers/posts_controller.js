// const Post = require('../models/post');

// module.exports.create = function(req,res){
//     Post.create({
//         //defining the values
//         content: req.body.content,
//         user : req.user._id,

        
//         //it's allowing me to create this fucking property which in not present inside my postschema
//         // although it's allowing me to create this  but it's not present in the database only those are present which are inside my schema 
//         // rohan : req.user._id
//     },function(err,post){
//         if(err){
//             console.log('error in creating a post'); return;}
//             return res.redirect('back');
//         }
//     );
// }


const Post = require('../models/post');
const Comment = require('../models/comment')
module.exports.create = async function(req,res){
  try{
    let post = await Post.create({
      //defining  the values
      content:req.body.content,
      user:req.user._id
    });
    //for checking it's json file
    console.log(post);
    if(req.xhr){
      //if we want to populate the homecontroller
      post = await post.populate(['user']);
      return res.status(200).json({
        data:{
          post:post
        },
        message:"Post created"

      });
    }

    req.flash('success','Post published !!!');
    return res.redirect('back');
  
  }catch(err){
         req.flash('error',err);
         console.log(err);
         return res.redirect('back');
  }
    
}

module.exports.destroy = async function(req,res){
  try{
     let post = await Post.findById(req.params.id); 
      //.id means coverting the object id into string
      //inside post model user is id therefore post.user will be the id here not the user 
      if(post.user == req.user.id){
        
      //from deleting the data base
      post.remove();
      await  Comment.deleteMany({post:req.params.id});
      if(req.xhr){
          
          
          return res.status(200).json({
            data:{
              post_id: req.params.id
            },
            message:"Post deleted"
          });
      }
       req.flash('success',"post and comments delted");
       return res.redirect('back');
      }else{
        req.flash('error','You cannot delete this post! ');
        return res.redirect('back');
      }
    

  }catch(err){

    console.log('error',err);
    return res.redirect('back');

  }
    
}

