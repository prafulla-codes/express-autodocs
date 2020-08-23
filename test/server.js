const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const app = express();

// Body Parser Middleware
app.use(express.json());

// DB Config
// const db = config.get("mongoURI");

//  Connect to MongoDB
// mongoose
//   .connect(db, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// Use Routes
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.get("/sayHello", (req, res) => {
  res.send("Hello");
});
app.delete("/delete", (req, res) => {
  res.send("Poof, your app is deleted!");
});
// Serve Static Assets if in production
if (process.env.NODE_ENV == "production") {
  // Set a static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });

  app.post("/users", auth, function (req, res) {
    /*
    @description - This API will add a new user to the database!
    IDK how its gonna do it tho :c
    @label - Private
  */
    res.send("User Created");
  });
}
// Server Connection
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Started on port ${port}`));
