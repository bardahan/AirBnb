const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/myapp").then(() => {
  console.log("Connected to mongoDB");
});

var propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: true,
  },
  daily_price: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

var usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true, dropDups: true },
  },
  password: {
    type: String,
    required: true,
  },
  privileges: {
    type: Number,
    required: true,
    min: 1,
    max: 3,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
});

var chargesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usersSchema",
    required: true,
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "propertySchema",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  dateFrom: {
    type: String,
    required: true,
  },
  dateTo: {
    type: String,
    required: true,
  },
});

const PropertySchema = mongoose.model("propertySchema", propertySchema);
const UsersSchema = mongoose.model("usersSchema", usersSchema);
const ChargesSchema = mongoose.model("chargesSchema", chargesSchema);

module.exports = { PropertySchema, UsersSchema, ChargesSchema };
