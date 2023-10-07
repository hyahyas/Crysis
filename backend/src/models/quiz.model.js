const mongoose = require('mongoose');


const caloriesSchema = mongoose.Schema({
  calories: { type: Number, required: true },
  meals : [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Meal'
  }]
})

const restaurantSchema = mongoose.Schema({
  name: { type: String, required: true },
  logoUri: { type: String, required: true },
  website: { type: String, required: true },
  locations: { type: String, required: true },
  phone_number: { type: String, required: true },
  calories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Calory'
  }]
});


const mealSchema = mongoose.Schema({
    name: { type: String, required: true },
    MB: { type: Boolean, required: true },
})



// arg1: name of model in app, arg2: schema, arg3: collection name in db
const Restaurant = mongoose.model('Restaurant', restaurantSchema, "Restaurants");
const Calory = mongoose.model('Calory', caloriesSchema, "Calories");
const Meal = mongoose.model('Meal', mealSchema, "Meals");

module.exports = {Restaurant, Meal, Calory};