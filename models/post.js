// const mongoose = require('mongoose');
// const postSchema = new mongoose.Schema({
//     content:{
//         type:String,
//         required:true
//     },
//     user:{
//         //it has reference to user associated with a particular objectID
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'User'
//     }
// },{
//     timestamps:true
// });

// const Post = mongoose.model('Post',postSchema);
// module.exports = Post;

const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comments:[
        {type:mongoose.SchemaTypes.ObjectId,
         ref:'Comment'
        }
        

    ]
},{
    timestamps:true
});

const Post = mongoose.model('Post',PostSchema);
module.exports = Post;


















