const express = require("express");
const logger = require("morgan");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION



// ROUTES
//  GET  / route
app.get('/', (req, res) => {
    res.send("<h1>Lab | Express Mongoose Recipes</h1>");
});


//  Iteration 4 - Create recipe route
//  POST  /recipes route


//  Iteration 5 - Read all recipes
//  GET  /recipes route


//  Iteration 6 - Read a single recipe
//  GET  /recipes/:id route


//  Iteration 7 - Update a single recipe
//  PUT  /recipes/:id route


//  Iteration 8 - Delete a single recipe
//  DELETE  /recipes/:id route


//  Iteration 9 - Create a single user
//  POST  /users route


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));