const express = require("express");
const fs = require("fs");
const drawApp = require("./drawApp/main");
const app = express();
const port = 3001;
let canvas = [];

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

drawApp.start("input.txt", "output.txt");
app.get("/download", (req, res) => {
  res.setHeader("Content-disposition", "attachment; filename=output.txt");
  res.download("output.txt", err => {
    if (err) {
      res.status("500");
    }
  });
});

app.post("/command", (req, res, next) => {
  const command = req.body.line.replace("\n", "");
  try {
    canvas = drawApp.draw([command], undefined, canvas);
    res.json(canvas);
  } catch (error) {
    next(error);
  }
});

app.post("/createCanvas", (req, res, next) => {
  try {
    canvas = drawApp.draw([
      `C ${req.body.widthCanvas} ${req.body.heightCanvas}`
    ]);
    res.json(canvas);
  } catch (error) {
    next(error);
  }
});

app.get("/refresh", (req, res) => {
  try {
    canvas = [];
    res.status(200).send("ok");
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => {
  console.log("App listening on port: " + port);
});
