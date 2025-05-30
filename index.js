const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware/BodyParser
app.use(express.json());

const PORT = process.env.PORT || 7000;

const MONGODB_URL = "mongodb+srv://holumighty:holumighty@cluster0.enux45p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGODB_URL)
  .then(() => {
    console.log("MongoDB Connected..");
    app.listen(PORT, () => {
      console.log(`Server is running....on port ${PORT}`);
    });
  })
 
  app.get("/", (request, response) => {
    response.send("Welcome to the test server");
  });

app.post("/add-user", (request, response) => {
    const newUser = request.body;

    response.json({
        message: "User added successfully",
        user: newUser     
    });
});