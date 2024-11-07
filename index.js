const express = require('express');
const mongoose = require('mongoose');

const mealplanRouter = require('./mealplan/routes.js')

const app = express();
const port = 3000;

const dbUrl = process.env.DB_URL;

// middleware
// app.set('view engine', 'ejs');
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));


// routes
app.use("/mealplans", mealplanRouter);

app.get("/", (req, res) => {
    res.render("home");
})




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

// start();

const getDocs = require('./scratch/mongo1.js');
const results = async () => {
    await mongoose.connect(dbUrl)
    const docs = await getDocs();
    let first = docs[0];
    let firstDate = first.date;
    console.log(firstDate);
    console.log("get date: " + firstDate.getDay())
}
results();