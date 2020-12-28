// a middleware to Verify if the mail was already used or not
let MailList = [];
module.exports = function MailVerifierMiddleware(req, res, next) {
    console.log(req.body)
    if (MailList.includes(req.body.email)) {
        //forbidden
        res.status(403).send('Mail already exists');
    } else {
        MailList.push(req.body.email)
        next();
    }

}