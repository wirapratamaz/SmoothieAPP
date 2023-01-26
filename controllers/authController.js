const User = require('../models/User');

const handleErrors = (err) => { 
    // log the error message and code to the console
    console.log(err.message, err.code);
    // initializing an errors object
    let errors = { email: '', password: ''};

    /// duplicate email error
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    //validate error
    if (err.message.includes('user validation failed')){
        // console.log(err);
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}
module.exports.login_get = (req, res) => {
    res.render('login');
}
module.exports.signup_post = async (req, res) => {
    //Destructuring assignment from request body
    const { email, password } =  req.body;
    
    try {
        //Asynchronously create a new user
        const user = await User.create({ email, password });
        //Send a JSON response
        res.status(201).json(user);
    } catch (err) {
        const errors = handleErrors(err);
        // Send a response error
        res.status(400).json({ errors });
    }
}
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    console.log(email, password);

    res.send('user login');
}