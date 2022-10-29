const expressAsyncHandler = require('express-async-handler');
const sgMail = require('@sendgrid/mail');
const Filter = require('bad-words');
const EmailMsg = require('../../model/EmailMessaging/EmailMessaging');

const sendEmailMsgCtrl = expressAsyncHandler(async(req,res)=>{
    console.log(req.user);
    const {to,subject,message} = req.body;
    //get the message
    const emailMessage = subject + " " + message;
    const filter = new Filter();
    const isProfane  = filter.isProfane(emailMessage);
    if(isProfane)
    throw new Error('Email sent failed, because it contains a profane words.');
    console.log(emailMessage);
    try {
    const msg = {
        to,
        subject,
        text:message,
        from:'tiwaripankaj2013@yahoo.com',
    };
    await sgMail.send(msg);
    //save to our db
    await EmailMsg.create({
        sentBy:req?.user?._id,
        from:req?.user?.email,
        to,message,subject
    });
    res.json('mail sent');         
    } catch (error) {
        res.json(error);
    }

});

module.exports = {sendEmailMsgCtrl};