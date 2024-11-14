const express = require('express');
const action = require('./controllers/MealPlanController.js')
const mealplanRoutes = express.Router();

mealplanRoutes.get('/', action.getAll)
mealplanRoutes.get('/new-meal', action.getNewMeal)
mealplanRoutes.post('/new-meal', action.postNewMeal)
mealplanRoutes.post('/', action.postNewMealPlan)

module.exports = mealplanRoutes;