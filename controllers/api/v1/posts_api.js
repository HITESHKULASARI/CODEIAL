
const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function(req,res){

    let posts = await Post.find({})

        .sort('-createdAt') 
        .populate('user')
        .populate({
          path: 'comments',
          populate: {
            path: 'user'

          }         
        });


    return res.json(200,{
        message : "List of posts",
        posts : posts
    })
}

module.exports.destroy = async function(req,res){
    try{
       let post = await Post.findById(req.params.id); 
         //we don't have user 
        if(post.user == req.user.id){
          
        //from deleting the data base
        post.remove();
        await  Comment.deleteMany({post:req.params.id});
        // we can skip this part of sending file
        // if(req.xhr){
            
            
        //     return res.status(200).json({
        //       data:{
        //         post_id: req.params.id
        //       },
        //       message:"Post deleted"
        //     });
        // }
        //we dont required flash because we are sending the json data
        //  req.flash('success',"post and comments delted");
         return res.json(200,{
            message:'deleted the post and associated comments'
         });
        }else{
          // req.flash('error','You cannot delete this post! ');
          return res.json(401,{
            message:"You cannot delete this post!"
          });
        }
      
  
    }catch(err){
  
      
      return res.json(500,{
        message:"Internal server error"
      });
  
    }
      
  }
  
  