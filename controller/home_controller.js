// module.exports.home = function(req,res){
//     //view engine jo setup kiya hai usse le paa raha hai ye
//     return res.render('home.ejs',{
//         title:"Home"
//     });
// }



module.exports.home = function(req,res){

    return res.render('home.ejs',{
        title:"Home"
    });
}
