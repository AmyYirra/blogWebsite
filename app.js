const express = require("express");
const bodyParser = require("body-parser");
const { render } = require("ejs");
const { urlencoded } = require("body-parser");
// const content = require(__dirname + "/truncate.js");
const app = express();
const homeContentParagraph =
  "Life is beautiful, but not always. It has lots of problems you have to face everyday. Don't worry though! All these problems make you strong, it gives you courage to stand alone in future. Life is full of moments of joy, pleasure, success and comfort punctuated by misery, defeat, failures and problems. There is no human being on Earth, strong, powerful, wise or rich, who has not experienced, struggle, suffering or failure. You have to work hard to reach to the highest position. Life is full of paths, you just have to choose the right one. Life is interesting and amazing like the stars up in the skies.";
const aboutContent =
  "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.";
const contactContent =
  "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.";

let journals = [];
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", { homeContent: homeContentParagraph, journals: journals });
});

app.post("/", (req, res) => {
  res.render("/");
});
app.get("/contact", function (req, res) {
  res.render("contact", { heading: "Contact", contactContent: contactContent });
});
app.get("/about", (req, res) => {
  res.render("about", { heading: "About Us", aboutContent: aboutContent });
});
app.get("/compose", (req, res) => {
  res.render("compose");
});
app.post("/compose", (req, res) => {
  const journal = {
    title: req.body.postTitle,
    body: req.body.postBody,
  };
  journals.push(journal);
  res.redirect("/");
});
app.get("/posts/:postName", function (req, res) {
  // res.send(req.params);
  const requestTitle = req.params.postName;
  journals.forEach((item) => {
    if (item.title === requestTitle) {
      res.render("posts", { postTitle: item.title, postBody:item.body });
    }
  });
});

app.listen(3000, function () {});
