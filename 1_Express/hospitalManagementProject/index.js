const express = require("express");   // import express
const app = express();                // initialize express

const PORT = 3000;
app.use(express.json());

const users = [{
    name: "jhon",
    kidneys: [{
        healthy: false
    }]
}];

app.get("/", (req, res) => {
    const jhonKidneys = users[0].kidneys;
    const numberOfKidneys = jhonKidneys.length;
    let numberOfHealthyKidney = 0;
    for (let i = 0; i < jhonKidneys.length; i++) {
        if (jhonKidneys[i].healthy) {
            numberOfHealthyKidney = numberOfHealthyKidney + 1;
        }
    }
    let numberOfUnhealthyKidney = numberOfKidneys - numberOfHealthyKidney;
    res.json({
        numberOfKidneys,
        numberOfHealthyKidney,
        numberOfUnhealthyKidney
    })
});

app.post("/", (req, res) => {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "done!"
    })
})

app.put("/", (req, res) => {
    if (isThereUnhealthyKidneys()) {
        for (let i = 0; i < users[0].kidneys.length; i++) {
            users[0].kidneys[i].healthy = true;
        }
        res.json({
            msg: "Update done!"
        })
    }else{
        res.status(411).json({
            msg: "No Unhealthy kidneys"
        })
    }

})

app.delete("/", (req, res) => {
    if (isThereUnhealthyKidneys()) {
        const newKidneys = [];
        for (let i = 0; i < users[0].kidneys.length; i++) {
            if (users[0].kidneys[i].healthy) {
                newKidneys.push({
                    healthy: true
                })
            }
        }
        users[0].kidneys = newKidneys;
        res.json({
            msg: "deleted!"
        })
    } else {
        res.status(411).json({
            msg: "No Unhealthy kidneys"
        })
    }

})

function isThereUnhealthyKidneys() {
    let unhealthy = false;
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy) {
            unhealthy = true;
        }
    }
    return unhealthy;
}
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
