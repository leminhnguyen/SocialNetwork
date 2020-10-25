const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Comments schema that has reference to Post and user schemas
 */
const commentSchema = Schema({
  comment: {
    type: String,
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  poster: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Comment = mongoose.model("comments", commentSchema);
