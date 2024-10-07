const express = require('express');
const mongoose = require('mongoose');

const { router: mpRouter } = require('./controllers/MealPlanController.js')

const app = express();
const port = 3000;

const dbUrl = process.env.DB_URL;

// routes
app.use("/mealplans", mpRouter);

app.get("/", (req, res) => {
    res.send("Welcome to Meal ERP")
})
// middleware
// app.set('view engine', 'ejs');
app.set('view engine', 'pug');



// initialization
const start = async () => {
    try {
        await mongoose.connect(dbUrl)
        console.log("Database connected");
        app.listen(port, () => {
            console.log("Listening on port: " + port);
        })
    }
    catch (err) {
        console.log(err);
    }
}

start();