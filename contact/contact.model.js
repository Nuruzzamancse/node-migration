const mongoose = require('mongoose');

const contactSchem = new mongoose.Schema({
    name: String,
    mobileNumber: String,
    image: String
})

module.exports = mongoose.model('contacts', contactSchem);