const express = require('express');
const router = express.Router();
const User = require('../models/User')
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { ensureAuthenticated, userStay } = require('../config/auth');

//routes
router.get('/login', userStay, (req, res) => {
    res.render('login');
});

router.get('/register', userStay, (req, res) => {
    res.render('register');
});

router.post('/register', userStay, (req, res) => {
    const { firstname, lastname, tel, email, password, password2 } = req.body;
    console.log(req.body);
    let errors = [];

    if (!firstname || !lastname || !tel || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    if(password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if(password.length < 8) {
        errors.push({msg: 'Password should be at least 8 characters'});
    }

    if(errors.length > 0) {
        res.render('register', {
            errors, 
            firstname,
            lastname,
            tel, 
            email, 
            password, 
            password2
        });
    }else {
        //Validation passed
        User.findOne({ email: email})
        .then(user => {
            if(user) {
                //i.e User exists
                errors.push({ msg: 'Email is already registered' })
                res.render('register', {
                    errors, 
                    firstname,
                    lastname,
                    tel, 
                    email, 
                    password, 
                    password2
                });
            } else {
                const newUser = new User({
                    firstname,
                    lastname,
                    tel,
                    email,
                    password
                });

                //Hash Password
                bcrypt.genSalt(10, (err, salt) => 
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    //set password to hashed
                    console.log(hash);
                    newUser.password = hash;
                    // Save user
                    newUser.save()
                    .then(user => {
                        console.log(newUser);
                        req.flash('success_msg', 'You are now registered and can login');
                        res.redirect('/users/login');
                    })
                    .catch(err => console.log(err))
                }))
            }
        });
    }
});

// Login Handle
router.post('/login', userStay, (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('sucess_msg', 'You are now logged out');
    res.redirect('/users/login');
});

module.exports = router;