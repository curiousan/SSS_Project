const express = require('express');
const router = express.Router();
const passport = require('./../config/passport');
const videoController = require('./../controller/videoController');
const jwt = require('jsonwebtoken');
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

router.get('/', (req, res) => {
    videoController.allVideos(req, (err, data) => {
        // for (let video of data) {
        //     video.uploadedOn = video.uploadedOn.toDateString();
        //   console.log(video.uploadedOn);
        // }

        const response = {videos: data};
        response.flash_info = req.flash('info_msg');
        response.flash_err = req.flash('err_msg');
        if (req.isAuthenticated()) {
            response.currentUser = req.user;
            return videoController.myVideos(req.user, (err, data) => {
                if (data) response.myVideos = data;
                return res.render('index', response)

            });


        } else {
            if (err) return res.render('index', err);
            return res.render('index', response);

        }


    });
});

router.get('/video/:id', (req, res) => {

    videoController.singleVideo(req, (err, data) => {
        if (err) return res.redirect('/', {video: data});
        return res.render('player');
    });
});

router.get('/add', isLoggedIn, (req, res) => {
    res.render('add', {currentUser: req.user});
});

router.get('/update/:id', isLoggedIn, videoController.updateInterface);

router.get('/printBuckets', isLoggedIn, (req, res) => {
    console.log(req.user);
    aws.listBucket();
    res.render('index', {currentUser: req.user});
});

router.get('/videos', (req, res) => {
    console.log(req.user);

    videoController.allVideos(req, (err, data) => {
        const response = {videos: data};
        if (req.isAuthenticated) {
            response.currentUser = req.user;
        }
        if (err) return res.render('index', err);
        return res.render('video-details', response);
    });
});

//  --------- local routes -------------------------------------//

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    return res.redirect('/login');
});

router.get('/login', isLoggedOut, (req, res) => {
    res.render('login', {message: req.flash('loginMessage')});
});

router.get('/signup', isLoggedOut, (req, res) => {
    res.render('signup', {message: req.flash('signUpMessage')});
});

router.post('/login', isLoggedOut, (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        if (err || !user) return res.redirect('/login');
        req.login(user, (err) => {
            if (err) return res.redirect('/login');
            const token = jwt.sign(user, 'somesecret');
            res.cookie('token', token, {maxAge: 1000});
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

router.get(
    '/auth/facebook',
    passport.authenticate('facebook', {
        scope: ['public_profile', 'email'],
    })
);

// ---facebook callback routes ------
router.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login',
    })
);

module.exports = router;
module.exports.isLoggedIn = isLoggedIn;
module.exports.isLoggedOut = isLoggedOut;
