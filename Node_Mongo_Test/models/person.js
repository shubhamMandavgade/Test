const mongoose = require('mongoose');

var Person = mongoose.model('Person', {
    name: { 
        type: String,
        require: true,
        lowercase: true,
        trim: true
    },
    age: { 
        type: String,
        lowercase: true,
        trim: true, 
    },
    gender: { 
        type: String,
        lowercase: true,
        trim: true,
        enum:['male', 'female','common'] 
    },
    mob_no: { 
        type: String 
    }
});

module.exports = { Person };