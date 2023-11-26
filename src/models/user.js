const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    profileImg
        : {
        type: String,
        require: true,
    },
    coverImg
        : {
        type: String,

    },
    blood: {
        type: String,
        require: true,
    },
    districts: {
        type: String,
        require: true,
    },
    upuzilla: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: ['Admin', 'Donor', 'Volunteer', 'Guest']
    },
    status: {
        type: String,
        enum: ["Active", "Blocked"]
    },
});

const user = model("users", userSchema);

module.exports = user;