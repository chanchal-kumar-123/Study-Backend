const express = require("express");
const app = express();

function isOldEnoughMiddleware(req, res, next) { // defining the middleware
    const age = req.query.age;
    if (age >= 14) {
        next();
    } else {
        res.json({
            msg: "you are not eligible"
        })
    }
}
//app.use(isOldEnoughMiddleware); // if every route needed to go through this middleware then we can initialize on top . and we can remove the middleware from app.get or app.post.
// Note : this only attach that below its.
app.get('/ride2',isOldEnoughMiddleware, (req, res) => { // at /ride2 url , then go to isOldMiddleware and 
    res.json({                                          // based on the condition go to next middleware ->
        msg: "you have successfully riden the ride2"    // (req,res)=>{} (it is also a middleware)
    })
})
app.get('/ride1',isOldEnoughMiddleware, (req, res) => {
    res.json({
        msg: "you have successfully riden the ride1"
    })
})

app.listen(3000);