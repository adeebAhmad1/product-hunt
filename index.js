const express = require("express");
const path = require("path");
const Mailchimp = require("mailchimp-api-v3");
require("dotenv").config({ path: __dirname + "/varibles.env" });
const app = express();
const mc_api_key = process.env.MAILCHIMP_KEY;
const list_id = process.env.LIST_ID;

// Serve static files from React App
app.use(express.static(path.join(__dirname, "client/build")));

const mailchimp = new Mailchimp(mc_api_key);

app.get("/api/memberAdd", (req, res) => {
  mailchimp.post(`/lists/${list_id}/members/`, {
      email_address: req.query.email,
      status: "subscribed",
    })
    .then((result) => {
      res.send({result});
    })
    .catch((error) => {
      res.send({error});
    });
});


// API endpoint

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 9001;
app.listen(port);

console.log(`Express listening on port ${port}`);
