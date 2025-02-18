require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskroutes");

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/tasks", taskRoutes);

app.get("/", async (req, res) => {
    res.render("index");
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
