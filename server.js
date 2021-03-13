const express = require("express");
const app = express();
let STATUS = 0;
let DATA = "";

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  if (STATUS == 0) res.status(204).send({ msg: "no content" });
  else res.send(DATA);
});
app.get("/getActive", (req, res) => {
  if (STATUS == 0) res.status(204).send("no content");
  else res.send(DATA);
});

app.post("/", (req, res) => {
  const data = req.body.LightActive;
  DATA = data;
  STATUS = 1;
  res.json("Success: " + DATA);
});

app.get("/close", (req, res) => {
  STATUS = 0;
  res.status(202).json("Close Success");
});

app.get("/web", function (req, res) {
  res.sendFile("./index.html", { root: __dirname });
});

app.listen(process.env.PORT, () => {
  console.log("Open server");
});