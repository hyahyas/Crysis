const mongoose = require('mongoose');


const mealsSchema = new mongoose.Schema({
    calories: Number,
    name: String,
    mb : Boolean,
    restraunts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restraunts'
    }
});

const restrauntsSchema = new mongoose.Schema({
    name: String,
    icon: String,
    meals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meals'
    }]
});

const meals = mongoose.model('Meals', mealsSchema, "Meals");
const restraunts = mongoose.model('Restraunts', restrauntsSchema, "Restraunts");

module.exports = { restraunts, meals };

