const express = require('express');
const router = express.Router();


// const User = require('./../models/user');
const passport = require('./../config/passport');
// const utilities = require('./../models/utilities');

// a simple function to check if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login');
};

// a simple function to check if the user is logged in
const isLoggedOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return next();
};

router.use(passport.initialize());
router.use(passport.session());

router.get('/', isLoggedIn, (req, res) => {
res.render('index', {user: req.user});
});
router.get('/add', isLoggedIn, (req, res) => {
    res.render('add', {user: req.user});
    });

router.get('/printBuckets', isLoggedIn, (req, res) => {
    aws.listBucket();
    res.render('index', {user: req.user});
});

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    return res.redirect('/login');
});


//  --------- local routes -------------------------------------//

router.get('/login', isLoggedOut, (req, res) => {
    res.render('login' , {message: req.flash('loginMessage')} );
});


router.get('/signup', isLoggedOut, (req, res) => {
    res.render('signup', {message: req.flash('signUpMessage')} );
});

router.post('/login', isLoggedOut, (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        if (err || !user) return res.redirect('/login');
        req.login(user, (err) => {
            if (err) return res.redirect('/login');
            return res.redirect('/');
        });
    })(req, res, next);
});


router.post('/signup', isLoggedOut, (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
        console.log('authentication called');
        if (err || !user) return res.redirect('/signup');
        req.login(user, (err) => {
            if (err) return res.redirect('/signup');
            return res.redirect('/');
        });
    })(req, res, next);
});

// facebook routes

// ----------- route for facebook authentication and login ---------//

router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email'],
}));


// ---facebook callback routes ------
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login',
}));



module.exports = router;
