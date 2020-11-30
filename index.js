const express = require("express");
const path = require("path");
const Mailchimp = require("mailchimp-api-v3");
require("dotenv").config({ path: __dirname + "/varibles.env" });

const mc_api_key = process.env.MAILCHIMP_KEY;
const list_id = process.env.LIST_ID;

const app = express();
const mailchimp = new Mailchimp(mc_api_key);

// Serve static files from React App
app.use(express.static(path.join(__dirname, "client/build")));

// API endpoint

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 9001;
app.listen(port);

app.get("/api/memberAdd", (req, res) => {
  console.log(req,res)
  mailchimp.post(`/lists/${list_id}/members/`, {
      email_address: req.query.email,
      status: "subscribed",
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

console.log(`Express listening on port ${port}`);
