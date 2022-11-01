const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/myapp"); // Local Mongo Url

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: false,
  },
  rating: {
    type: Number,
    require: true,
  },
  daily_price: {
    type: Number,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  location: {
    type: (Number, Number),
    require: true,
  },
});

const Propertydb = mongoose.model("propertyDb", schema);

module.exports = Propertydb;
