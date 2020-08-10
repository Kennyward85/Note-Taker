// Dependencies and basic middlewear
const express = require("express");
const htmlRoutes = require("./routes/htmlRoute");
const apiRoutes = require("./routes/apiRoute");

// Setting up express and port
const app = express();
const PORT = process.env.PORT || 3000;


// Middleware for the stored data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Includes all static files in public folder
app.use(express.static("public"));

// Calling the Api routes from their folder
app.use("/api", apiRoutes);

// Calling the html routes from their folder
app.use("/", htmlRoutes);

app.listen(PORT,()=> console.log(`Listening on PORT :` + PORT));