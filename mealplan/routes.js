const express = require('express');
const action = require('./controllers/MealPlanController.js')
const mealplanRoutes = express.Router();

mealplanRoutes
    .route('/')
    .get(action.getAll)
    .post(action.postNewMealPlan)
    ;

mealplanRoutes
    .route('/new-meal')
    .get(action.getNewMeal)
    .post(action.postNewMeal)
    ;


module.exports = mealplanRoutes;