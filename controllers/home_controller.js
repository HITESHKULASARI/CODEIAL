// module.exports.home = function(req,res){
//     //view engine jo setup kiya hai usse le paa raha hai ye
//     return res.render('home.ejs',{
//         title:"Home"
//     });
// }

const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = async function(req,res){
    try{
        let posts = await Post.find({})

        .sort('-createdAt') 
        .populate('user')
        .populate({
          path: 'comments',
          populate: {
            path: 'user'

          }         
        });
    
        let users = await User.find({});
        
        return res.render('home', {
            title: "Codieal||Home",
            posts: posts,
            all_users: users
        });


    }catch(err){
        console.log(err);
    }
     

}
    
   