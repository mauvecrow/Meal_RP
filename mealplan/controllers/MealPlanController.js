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
    let mealplans = [];
    try {
        // await setup();
        let mps = await MealPlan.find({})
        // console.dir(mps[0]);
        mealplans = [...mps];
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

module.exports = {
    getAll,
    getNewMeal,
    postNewMeal
}