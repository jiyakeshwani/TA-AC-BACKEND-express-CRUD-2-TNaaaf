var express = require("express");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  content: String,
  ArticleId: { type: Schema.Types.ObjectId, ref: Article },
});

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
