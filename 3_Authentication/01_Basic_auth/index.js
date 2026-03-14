const express = require("express");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "chanchal123";

const app = express();
app.use(express.json()); // used to extract username and password using req.body

const users = [];


app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    users.push({
        username,
        password
    })
    // check that this username is already exist or not 

    res.json({
        message: "you are signed in"
    })


})

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    console.log(username);
    console.log(password);

    let foundUser = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            foundUser = users[i];
        }
    }
    if (!foundUser) {
        res.json({
            message: "Crediential are not correct"
        })
        return
    } else {
        const token = jwt.sign({
            username
        }, JWT_SECRET);

        res.json({
            token: token
        })
    }
})

app.get("/get-password", (req, res) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({
            message: "Token missing"
        });
    }

    try {
        const decodedData = jwt.verify(token, JWT_SECRET);
        console.log(decodedData);

        let foundUser = null;

        for (let i = 0; i < users.length; i++) {
            if (users[i].username === decodedData.username) {
                foundUser = users[i];
            }
        }
        console.log(foundUser);

        res.json({
            username: foundUser.username,
            password: foundUser.password
        });

    } catch (err) {
        res.status(403).json({
            message: "Invalid token"
        });
    }
});

app.listen(3000);