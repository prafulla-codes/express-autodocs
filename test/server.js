const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
var queries = require("./routes/api/queries");
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
app.use("/api/queries", auth, queries);
app.use("/api/posts", require("./routes/api/posts"));
app.get("/sayHello", (req, res) => {
  res.send("Hello");
});
// Serve Static Assets if in production
if (process.env.NODE_ENV == "production") {
  // Set a static folder
  app.use(express.static("client/build"));
  /*
    Just a simple API
  */
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
  /*
    {
      "description":"Creates a new user",
      "label":"Private",
      "inputs":{
        "name":"The username by which he/she logs in",
        "password": "A string password"
      }
    }
  */
  app.post("/users", auth, function (req, res) {
    res.send("User Created");
  });
}
// Server Connection
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Started on port ${port}`));

let handleDelete = (req, res) => res.send("Deleted");
