const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const apiRoute = require("./routes/api.route");
const dotenv = require('dotenv');

dotenv.config();
const port  = process.env.PORT || 3000;

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res, next) => {
  res.send({ message: "Hello World" });
});

app.use("/api", apiRoute);

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    status: err.status || 500,
  });
});


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});