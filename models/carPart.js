const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarPartSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true },
});

// Virtual for car's URL
CarPartSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/carpart/${this._id}`;
});

// Export model
module.exports = mongoose.model("CarPart", CarPartSchema);
