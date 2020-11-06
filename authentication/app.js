const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express(); 

// Passport config 
require('./config/passport')(passport);

//DB config
const db =  require('./config/keys').MongoURI;

//mongoose connect
mongoose.connect(db, { useNewUrlParser: true }).then(() => console.log('MongoDB connected successfully')).catch(err => console.log(err));


app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser already shipped with express
app.use(express.urlencoded({ extended: false }));

// Express session middleware
app.use(session({
    secret: 'Alpha beta gamma sigma omega',
    resave: true,
    saveUninitialized: true
}));

// Passport Middleware - positioning is important
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//Global variables are declared for custom middlewares
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
