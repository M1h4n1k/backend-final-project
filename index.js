const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");

const tasksRoutes = require("./routes/tasks");
const authRoutes = require("./routes/auth");

connectDB();

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan("dev"));

app.use("/items", tasksRoutes);
app.use("/auth", authRoutes);

app.get("*", (req, res) => {
  res.status(404).send("Not Found");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
