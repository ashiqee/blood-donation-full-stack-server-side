const { Schema, model } = require("mongoose");

const userSchema = new Schema({
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

const user = model("upuzila", userSchema);

module.exports = user;