// module.exports.home = function(req,res){
//     //view engine jo setup kiya hai usse le paa raha hai ye
//     return res.render('home.ejs',{
//         title:"Home"
//     });
// }



module.exports.home = function(req,res){
    console.log(req.cookies);
    res.cookie('user_id',25);
    return res.render('home.ejs',{
        title:"Home"
    });
}
