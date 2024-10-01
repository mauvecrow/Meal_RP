const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    item: String,
    quantity: Number,
    uom: String,
    preparation: String
    // portions? how would this affect quantity? should that be a fn?
})

const RecipeSchema = new Schema({
    title: String,
    ingredients: [IngredientSchema],
    instructions: {
        type: Map, // keys are always a string
        of: String // values are a string
    },
    links: [String],
    portions: Number
})


const MealSchema = new Schema({
    name: String,
    tags: [String],
    recipe: RecipeSchema

})
const MealPlanSchema = new Schema({
    date: Date,
    breakfast: MealSchema,
    lunch: MealSchema,
    dinner: MealSchema,
    snacks: [MealSchema]
})