module.export = {
    'facebookAuth': {
        'clientID': process.env.FB_ID,
        'clientSecret': process.env.FB_SECRET,
        'callbackURL': 'http://localhost:8080/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields': ['id', 'email', 'name'],
     },
}