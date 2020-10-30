const mongoose = require("mongoose");

const User = mongoose.model("User", new mongoose.Schema({
    firstname: String,
    lastname: String,
    phone: Number,
    email: String,
    password: String,
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
})
);
module.exports = User;