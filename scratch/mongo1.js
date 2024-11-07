const mongoose = require('mongoose');
const { Recipe, MealPlan } = require('../mealplan/models/MealPlanSchemas.js');

let today = new Date(2024, 9, 3);
let sunday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
let saturday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay()));

const q1 = MealPlan.find({})
    .where('date').gte(sunday)
    .where('date').lte(saturday)
    .sort('date')
    ;


async function getDocs() {
    const docs = await q1.exec();
    return docs;
}

module.exports = getDocs;