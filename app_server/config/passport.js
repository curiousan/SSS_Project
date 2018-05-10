// load all the thing we need
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook');



// load the user model
const User = require('./../models/user');

// load all the methods on modal user

// export this functionality to our app
// used to serialize the user for the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// used to deserialize the user for the session
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        if (err) {
            console.error('There was an error accessing the records of' +
                ' user with id: ' + id);
            return console.log(err.message);
        }
        return done(null, user);
    });
});

// startegies

// Facebook Strategy
passport.use('facebook', new FacebookStrategy({
    clientID: process.env.FB_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: 'https://localhost:3000/auth/facebook/callback',
    profileURL: 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
    profileFields: ['id', 'email', 'name'],

},
// facebook will send back the token and profile ((--- CallBack function ----))
(token, refreshToken, profile, done) => {
    process.nextTick(() => {
        User.findOne({'facebook.id': profile.id}, (err, user)=>{
                if (err) return done(err, false, req.flash('loginMessage', 'Some error occured')); // some internal error
                if (user) return done(null, user); // user is found logged em in
                else { // if there is no user found signed em up
                    const newUser = new User({
                        'facebook.id': profile.id,
                        'facebook.token': token,
                        'facebook.name': profile.name.givenName+' '+profile.name.familyName,
                        'facebook.email': profile.emails[0].value,

                     });

                     newUser.save((err, user) => {
                         if (err) throw err;
                         return done(null, user);
                     });
                }
        });
    });
}
));

// Local Strategy
passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true, // allows us to pass back the entire request to the callback
}, (req, email, password, done) => {
    // asynchronous
    // User.findOne wont fire unless data is sent back

    process.nextTick(() => {
        // find the user whose email is same as the forms email
        // checking to see if the user trying to login already exist
        User.findOne({'local.email': email}, (err, user) => {
            // in case there were any errors
            if (err) {
                return done(err, false, req.flash('signupMessage', 'There is some problem in server try again'));
            }

            // check to see if there already a user with that email
            if (user) {
                console.log('user already exitst');
                return done(null, false, req.flash('signupMessage', 'That email is already taken'));
            } else {
                // create a new user
                const newUser = new User();
                newUser.local.username = req.body.username;
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);

                // save the user
                newUser.save((err) => {
                    if (err) {
                        throw err;
                    }
                    console.log('New user successfully created...', newUser.username);
                    return done(null, newUser, req.flash('signupMessage', 'Account created successfully'));
                });
            }
        });
    });
}

));

// ------------------------------------------------- local - login ----------------------------

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, (req, email, password, done) => {
    User.findOne({'local.email': email}, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            // TODO: generic error message!
            // MAYBE: add a small delay before returning (simulate the pwd hash verify, so attacker don't know).
            return done(null, false, req.flash('loginMessage', 'No user found'));
        }
        if (!user.validatePassword(password)) {
            return done(null, false, req.flash('loginMessage', 'wrong password'));
        }
        return done(null, user);
    });
}

));

module.exports = passport;


