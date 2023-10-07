const { restraunts, meals } = require('../models/restraunts.model');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Centralized error handling middleware
const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
};

//Creat a restraunt
exports.createRestraunt = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  try {
    const token = req.headers['authorization'].split(' ')[1];
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const { name, description, location, rating, menu, owner } = req.body;
    const ownerId = user.id;

    const restraunt = new restraunts({
      name,
      description,
      location,
      rating,
      menu,
      owner: ownerId,
    });

    await restraunt.save();

    res.json({ message: 'Restraunt created successfully', restraunt });
  } catch (err) {
    handleError(res, err);
  }
};

// Get all restraunts
exports.getAllRestraunts = async (req, res) => {
    try {
      const restaurants = await restraunts
        .find({})
        .populate({
          path: 'meals',
          select: 'name calories mb', // Specify the fields you want to select
        });
  
      res.json(restaurants);
    } catch (err) {
      handleError(res, err);
    }
  };
  
// Get all restaurants with meals sorted by calories
exports.getAllRestaurantsWithMealsSortedByCalories = async (req, res) => {
    try {
      const restaurants = await restraunts.find({}).populate('meals');
  
      const restaurantsWithMealsGroupedByCalories = restaurants.map((restaurant) => {
        const mealsGroupedByCalories = {};
  
        restaurant.meals.forEach((meal) => {
          const calorieRange = Math.floor(meal.calories / 100) * 100;
  
          if (!mealsGroupedByCalories[calorieRange]) {
            mealsGroupedByCalories[calorieRange] = [];
          }
  
          mealsGroupedByCalories[calorieRange].push({
            _id: meal._id,
            name: meal.name,
            calories: meal.calories,
            mb: meal.mb,
          });
        });
  
        return {
          _id: restaurant._id,
          name: restaurant.name,
          mealsGroupedByCalories,
        };
      });
  
      res.json(restaurantsWithMealsGroupedByCalories);
    } catch (err) {
      handleError(res, err);
    }
  };
  
  
  
  
  


//Create a meal
exports.createMeal = async (req, res) => {
    try {
      const { calories, name, mb, restrauntsId } = req.body;
  
      // Check if the restaurant exists
      const restaurant = await restraunts.findById(restrauntsId);
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
  
      const meal = new meals({
        calories,
        name,
        mb,
        restraunts: restaurant._id,
      });
  
      await meal.save();
  
      res.json({ message: 'Meal created successfully', meal });
    } catch (err) {
      handleError(res, err);
    }
  };
  
  //Delete Meal
    exports.deleteMeal = async (req, res) => {
        try {
        const meal = await meals.findById(req.params.mealId);
    
        if (!meal) {
            return res.status(404).json({ error: 'Meal not found' });
        }
    
        await meal.remove();
    
        res.json({ message: 'Meal deleted successfully' });
        } catch (err) {
        handleError(res, err);
        }
    };

// Get all meals for restrauntId
// Get meals by restaurant ID
exports.getMealsByRestaurant = async (req, res) => {
    try {
      const restaurantId = req.params.restaurantId;
  
      // Check if the restaurant exists
      const restaurant = await restraunts.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
  
      // Retrieve meals for the restaurant by its ID
      const mealsForRestaurant = await meals.find({ restraunts: restaurant._id });
  
      res.json(mealsForRestaurant);
    } catch (err) {
      handleError(res, err);
    }
  };
  
