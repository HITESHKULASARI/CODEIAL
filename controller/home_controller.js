module.exports.home = function(req,res){
    const a =10;
    const b = 10;
    return res.end('<h1>Express is up for codeial!</h1>');
}

module.exports.raw = function(req,res){
    
    return res.end('<h1>I AM YOUR RAW</h1>');
}


