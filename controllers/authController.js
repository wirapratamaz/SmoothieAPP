const User = require('../models/User');

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
        console.log(err);
        // Send a response error
        res.status(400).send('error, user not created');
    }
}
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    console.log(email, password);

    res.send('user login');
}