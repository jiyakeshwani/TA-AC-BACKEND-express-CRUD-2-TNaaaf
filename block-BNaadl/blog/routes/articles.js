var express = require("express");
var router = express.Router();

var Article = require("../models/articles");

router.get("/new", (req, res) => {
  res.render("articleForm");
});

router.get("/", (res, req, next) => {
  Article.find({}, (err, article) => {
    if (err) return err;
    res.render(articlelist, { article: article });
  });
});

router.get("/:id/edit", (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return next(err);
    res.render("articleupdateForm", { article: article });
  });
});
router.get("/:id/delete", (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndDelete(id, (err, article) => {
    if (err) return next(err);
    res.redirect("/article");
  });
});
router.post("/", (req, res, next) => {
  Article.create(req.body, (err, createdArticle) => {
    if (err) return next(err);
    res.redirect("/article");
  });
});

router.get("/:id/likes", (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, article) => {
    console.log(err, article);
    if (err) return next(err);
    res.redirect("/article/" + id);
  });
});
router.get("/:id/dislikes", (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, { $inc: { likes: -1 } }, (err, article) => {
    console.log(err, article);
    if (err) return next(err);
    res.redirect("/article/" + id);
  });
});
module.exports = router;
