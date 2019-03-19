const mongoose = require("mongoose");
const dataSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
});

module.exports = data = mongoose.model('data', dataSchema);