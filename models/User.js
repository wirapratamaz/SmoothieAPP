const mongoose = require('mongoose');
//validator function isEmail
const { isEmail } = require('validator');

//how to give array to function
const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        //validate object
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String, 
        required: [true, 'Please entar a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
});

//save a new user created
userSchema.post('save', function(doc, next) {
    console.log('new user was created & saved', doc);
    //call next middleware
    next();
});

//before a new user is created
userSchema.pre('save', function(next){
    console.log('user about to be created & saved', this);
    next();
});
const User = mongoose.model('user', userSchema);

module.exports = User;