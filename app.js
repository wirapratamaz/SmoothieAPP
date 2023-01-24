const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 5000;

//middleware
app.use(express.static('public'));

//view engine
app.set('view engine', 'ejs');

//connect mongodb
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

const dbURI = 'mongodb://127.0.0.1:27017/smoothie_db';
mongoose.connect(dbURI, {
	useNewUrlParser: true,
    useUnifiedTopology: true
    }).then(() => {
        console.log("Successfully connected to the database");    
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
});

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

// listen for requests
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});