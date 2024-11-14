const mongoose = require('mongoose');
const path = require('path');
const { Recipe, MealPlan } = require('../models/MealPlanSchemas.js');

const viewsRoot = path.join(__dirname, "..", "views");

const setup = async function () {
    const pkp = { name: "Pad Kha Pao" };
    const pasta = { name: "Sun Dried Tomato pasta" };
    const day1 = new MealPlan({ date: Date.now(), dinner: pkp })
    const day2 = new MealPlan({ date: new Date(2024, 9, 2), dinner: pasta })
    // await day1.save();
    // await day2.save();

}

const dayConverter = (num) => {
    switch (num) {
        case 0: return "Sunday";
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
        default: return "Unexpected number"
    }
}

const getAll = async (req, res) => {
    let qp = req.query;
    // searchDate should be in YYYY-MM-DD format
    let today = qp.searchDate ? new Date(qp.searchDate) : new Date();
    let sunday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
    let saturday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay()));
    let mealplans = new Map();
    for (let i = 0; i < 7; i++) {
        mealplans.set(new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + i).toLocaleDateString(), null);
    }

    try {
        // await setup();
        // need to validate searchDate is in a good format

        let mps = await MealPlan.find({})
            .where('date').gte(sunday)
            .where('date').lte(saturday)
            .sort('date');
        // console.dir(mps[0]);
        for (let mp of mps) {
            // console.log(mp);
            if (mealplans.has(mp.date.toLocaleDateString())) {
                mealplans.set(mp.date.toLocaleDateString(), mp)
            }
        }

        // console.log(mealplans)
    }
    catch (err) {
        console.log(err);
    }

    const viewName = 'meal-plans';
    const viewPath = path.join(viewsRoot, viewName);

    res.render(viewPath, { mealplans, dayConverter });
}

const getNewMeal = async (req, res) => {
    // TODO: need to guard and validate
    const doc = await MealPlan.findById(req.query.objId);

    const viewName = 'add-meal';
    const viewPath = path.join(viewsRoot, viewName);

    res.render(viewPath, { doc, mealType: req.query.type });
}

const postNewMeal = async (req, res) => {
    let { 'meal-name': name, 'meal-tags': tags, 'doc-id': id, mealType } = req.body;

    let mealInfo = { name: name, tags: tags.split(",") }
    let meal = { [mealType]: mealInfo }
    // console.log(meal);
    await MealPlan.updateOne({ "_id": id }, meal)
    res.redirect('/mealplans')
}


const postNewMealPlan = async (req, res) => {
    let { 'meal-date': rawDate } = req.body; //eg 11/3/2024
    let sdate = rawDate.split("/");
    let date = new Date(sdate[2], sdate[0] - 1, sdate[1]) //note month is zero based, hence -1
    const mealplanObj = {
        date: date,
        period: {
            number: sdate[0],
            year: sdate[2],
            value: rawDate
        },
        breakfast: null,
        lunch: null,
        dinner: null,
        snacks: null
    };

    const mp = await MealPlan.create(mealplanObj);

    const viewName = 'mealplan';
    const viewPath = path.join(viewsRoot, "components", viewName);

    res.render(viewPath, { mp, dayConverter });
}

module.exports = {
    getAll,
    getNewMeal,
    postNewMeal,
    postNewMealPlan
}