const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl)
    .then( (result) => {
        console.log("Database connected");
        app.listen(port, () => {
            console.log("Listening on port: " + port);
        })
    })
    .catch( err => console.log(err));

app.get("/", (req, res) => {
    res.send("Welcome to Meal ERP")
})