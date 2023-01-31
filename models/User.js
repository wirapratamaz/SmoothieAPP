const mongoose = require('mongoose');
//validator function isEmail
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

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

//encrypting the password of a new user before saving it
userSchema.pre('save', async function(next){
    // Generate a salt value
    const salt = await bcrypt.genSalt();
    // Hash the password with the salt value
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;