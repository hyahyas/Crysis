const express = require("express");
const {Restaurant, Meal, Calory} = require("../models/quiz.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");


const recordRoutes = express.Router();




recordRoutes.route("/addRestaurantLeen").post(async (req, res) => {
    try {
        const restaurants = new Restaurant({
            name: 'Leens',
            logoUri: 'https://www.leensnola.com/wp-content/uploads/2019/10/leens-logo.png',
            website: 'https://www.leensnola.com/',
            locations: '7708 Maple St, New Orleans, LA 70118',
            phone_number: '(504) 866-8514',
            calories: [],
        })
        await restaurants.save();
        res.json(restaurants);
    } catch (err) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

recordRoutes.route("/addRestaurantTacoBell").post(async (req, res) => {
    try {
        const meal1 = new Meal({
            name: 'Salad',
            MB: true,
        })
        const meal2 = new Meal({
            name: 'Pasta',
            MB: false,
        })
        const calories = new Calory({
            calories: 100,
            meals: [meal1._id, meal2._id],
        })
        const restaurants = new Restaurant({
            name: 'Taco Bell',
            logoUri: 'https://www.tacobell.com/static/images/logo.png',
            website: 'https://www.tacobell.com/',
            locations: '7708 Maple St, New Orleans, LA 70118',
            phone_number: '(504) 866-8514',
            calories: [calories._id],
        })  
        await calories.save();
        await meal1.save();
        await meal2.save();
        await restaurants.save();
        res.json(restaurants);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Internal server error" });
    }
});

recordRoutes.route("/allInfo").get(async (req, res) => {
    try {
        // const restaurants = await Restaurant.find().populate('calories').populate('calories.meals');
        // manually populate meals
        // Get the token from the header
        let token; 
        let decoded
        // Verify the token
        try{
            token = req.header('authorization').split(' ')[1];
            decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (err) {
            return res.status(401).json({ error: "Invalid Token" });
        }

        let user = await User.findById(decoded.id);
        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }
        const restaurants = await Restaurant.find().populate({ 
            path: 'calories',
            populate: [{
              path: 'meals'
            }]
          });
        res.json(restaurants);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Internal server error" });
    }
});

module.exports = recordRoutes;