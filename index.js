const express = require("express");
const {authUser, fetchImage} = require("./auth");
const app = express();
const port = 3000;

const db = {};
let reqCounter = 0;

app.use(express.json());
app.use(authUser);

app.all("/cat", async (req, res, next) => {
    if (["GET", "POST", "PUT", "DELETE"].includes(req.method)) {
        next();
    }
    else {
        await fetchImage(405, res);
    }
});

app.get("/cat", (req, res) => {
    fetchImage(200, res);
});

app.post("/cat", async (req, res) => {
    const {id, name} = req.body;
    if (!name || name.length < 2) {
        await fetchImage(400, res);
        return;
    }
    if (db[id]) {
        await fetchImage(409, res);
        return;
    }
    db[id] = name;
    await fetchImage(201, res);
});

app.put("/cat/:id", async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    if (!db[id]) {
        await fetchImage(404, res);
        return;
    }
    db[id] = name;
    await fetchImage(200, res);
});

app.delete("/cat/:id", async (req, res) => {
    const {id} = req.params;
    if (db[id]){
        await fetchImage(404, res);
        return;
    }
    delete db[id];
    await fetchImage(204, res);
});

app.get("/time", async (req, res) => {
    setTimeout(async () => {
        await fetchImage(408, res);
    }, 6000);
});

app.get("/many", async (req, res, next) => {
    reqCounter++;
    if (reqCounter > 5) {
        await fetchImage(429, res);
        return;
    }
    else {
        await fetchImage(200, res);
    }
});

app.listen(port, () => {
    console.log("running");
});