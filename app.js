const express = require("express");
//const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const peopleRouter = require("./routes/people");
const planetRouter = require("./routes/planet");

const app = express();

app.use(logger("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// CORS
app.use(cors());

app.use("/people", peopleRouter);
app.use("/planets", planetRouter);

module.exports = app;
