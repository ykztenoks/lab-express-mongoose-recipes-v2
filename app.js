const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model.js");
const app = express();
const uselessLogger = require("./uselessLogger.js");
// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
mongoose
  .connect("mongodb://127.0.0.1:27017/lab-express-mongoose-recipes")
  .then((connection) => console.log(connection.connections[0].name))
  .catch((err) => console.log(err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res) => {
  try {
    const fields = [
      "title",
      "instructions",
      "level",
      "ingredients",
      "duration",
    ];
    // const {title, instructions, level, ingredients, image, duration, isArchived} = req.body
    for (const field of fields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: "Please provide all fields" });
      }
    }

    const created = await Recipe.create(req.body);

    res.status(201).json(created);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();

    res.json(recipes);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:recipeId", async (req, res) => {
  try {
    const { recipeId } = req.params;

    const recipe = await Recipe.findById(recipeId);

    res.json(recipe);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:recipeId", async (req, res) => {
  try {
    const { recipeId } = req.params;

    const updated = await Recipe.findByIdAndUpdate(recipeId, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:recipeId", async (req, res) => {
  try {
    const { recipeId } = req.params;

    await Recipe.findByIdAndDelete(recipeId);

    res.json({ message: "Recipe deleted Succesfully" });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});
// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
