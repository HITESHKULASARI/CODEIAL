const nodeMailer = require('../../config/nodemailer');
console.log('i am here');
//this is another way of exporting a method
exports.newComment = (comment) => {
    console.log('inside newComment mailer');
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')
    nodeMailer.transporter.sendMail({
        from:'a@gmail.com',
        to: comment.user.email,
        subject: "new comment published!!",
        html: htmlString
    },(err,info)=>{
        if(err){console.log('error in sending mail',err);return;}
        console.log('Message sent',info);
        return;
    });
}