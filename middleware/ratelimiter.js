// a middleware to set a limit of number of words a user can justify daily
let buckets = new Map();
class TokenBucket {
    constructor(capacity, fillPerSecond) {
        this.capacity = capacity;
        this.tokens = capacity;
        //set counter to 80000 every 24 hour
        setInterval(() => this.addToken(), 86400);
    }

    addToken() {
        if (this.tokens < this.capacity) {
            this.tokens = 80000;
        }
    }

    take(NbWords) {
        if (this.tokens - NbWords > 0) {
            this.tokens -= NbWords;
            return true;
        }

        return false;
    }
}
module.exports = function limitRequestsMiddleware(req, res, next) {
    NumberOFWords = String(req.body).split(" ").length
    if (!buckets.has(req.token)) {
        buckets.set(req.token, new TokenBucket(80000, 10));
    }
    //Substract the number of words of the text to justify from the total available amount (80000) 
    if (buckets.get(req.token).take(NumberOFWords)) {
        next();

        //if we exceeded 80000 we return payement required
    } else {
        res.status(402).send('Payment Required.');
    }
}