const { Schema, model } = require("mongoose");

const upuzilaSchema = new Schema({
  id: {
    type: String,
    require: true,
  },
  district_id: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
});

const upuzila = model("upuzila", upuzilaSchema);

module.exports = upuzila;
