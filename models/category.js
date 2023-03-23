const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Category = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

// Virtual for category's URL
Category.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/category/${this._id}`;
});

// Export model
module.exports = mongoose.model("Category", Category);
