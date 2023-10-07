const express = require("express");
const { body } = require("express-validator");
const { getAllRestraunts, createRestraunt, deleteMeal, createMeal, getMealsByRestaurant, getAllRestaurantsWithMealsSortedByCalories} = require("../controllers/restraunts.controller");

const restrauntsRoutes = express.Router();


// CRUD announcements routes
restrauntsRoutes.route("/createRestraunt").post(createRestraunt)
restrauntsRoutes.route("/getAllRestraunts").get(getAllRestraunts)
// Get meals by restaurant ID
restrauntsRoutes.route("/getMealsByRestaurant/:restaurantId").get(getMealsByRestaurant);
restrauntsRoutes.route("/getAllRestrauntsbycal").get(getAllRestaurantsWithMealsSortedByCalories);
restrauntsRoutes.route("/createMeal").post(createMeal);
restrauntsRoutes.route("/deleteMeal/:mealId").delete(deleteMeal);

module.exports = restrauntsRoutes;