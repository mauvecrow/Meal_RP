const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    _id: false,
    item: String,
    quantity: Number,
    uom: String,
    preparation: String
    // portions? how would this affect quantity? should that be a fn?
})

const RecipeSchema = new Schema({
    title: { type: String, required: true },
    ingredients: [IngredientSchema],
    instructions: {
        type: Map, // keys are always a string
        of: String // values are a string
    },
    links: [String],
    portions: Number
})



const MealSchema = new Schema({
    _id: false,
    name: { type: String, required: true },
    tags: [String],
    recipe: { type: mongoose.ObjectId, ref: 'Recipe' }

})
const MealPlanSchema = new Schema({
    date: { type: Date, unique: true, required: true },
    period: {
        number: Number,
        year: Number,
        value: String
    },
    breakfast: MealSchema,
    lunch: MealSchema,
    dinner: MealSchema,
    snacks: [MealSchema]
})

const Recipe = mongoose.model("Recipe", RecipeSchema);
const MealPlan = mongoose.model("MealPLan", MealPlanSchema);

module.exports = {
    Recipe,
    MealPlan
}