// Load enviornment variables from env file
require('dotenv').config();
const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI;

const User = require("./model/user");

// Check if the URI is undefined or empty
if (!mongoURI) {
    console.error('MongoDB URI is undefined. Please check your .env file.');
    process.exit(1); // Exit the process if URI is not set
  }

// Connect to MongoDB  
mongoose.connect(mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Successfully connected to MongoDB"))
.catch((error) => console.error("Error connecting to MongoDB:", error));

// Start your app
const express = require("express");
const app = express();

// get API Endpoint
app.get("/",(req,res) => {
    //console.log("First Request");
    res.send("First Request!!!!");
})

app.get("/users", (req,res) => {
    //res.send("Users List :");
    let users = ["Isha", "Shrujal", "Anvi", "Ansh"];
    res.send({users: users,});

})

//POST API endpoint
app.post("/create_user", async (req,res) => {
    try{
        // Create a new instance of the User model with the request body data
        const myUser = new User(req.body);

        // Save the user instance to the database
        await myUser.save();
        // Respond with the created user data
        //res.send(`created your user ${req.body.name}`);
        res.send(myUser);
    } catch(err){
        res.status(500).send({ message: err.message });
    }
    //console.log(req.body.name);
    

})

app.listen(3000, () => {
    console.log("Listening port 3000");
})