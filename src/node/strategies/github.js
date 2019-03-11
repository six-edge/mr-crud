"use strict"

const strategy = require('passport-github').Strategy

// Passport strategy options
const passportStrategyOptions = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}${process.env.GITHUB_CALLBACK_URL}` 
}

// Gets only relevant user data
const getUserDto = user => {
    return {
        id: user.id,
        displayName: user.displayName,
        username: user.username,
        profileUrl: user.profileUrl,
        avatarUrl: user._json.avatar_url,
        roles: user.roles,
        provider: user.provider
    }
}

// Passport users are allocated roles in env vars
const admins = process.env.ROLE_ADMIN.split(",")
const users  = process.env.ROLE_USER.split(",")

// Attaches roles to users 
const applyRoles = user => {
    user.roles = []
    if (users.includes(user.username))
        user.roles.push('ROLE_USER')
    
    if (admins.includes(user.username))
        user.roles.push('ROLE_ADMIN')
    
    return user
}


// On successful authentication
const onSuccess = (accessToken, refreshToken, profile, done) => {
    
    // Callback expects an error and user object
    return done(null, applyRoles(profile))
}

module.exports = {
    strategy: (app, passport) => {

        // Passport authenticated session persistence
        passport.serializeUser(function(user, done) {
            done(null, getUserDto(user));
        });
        passport.deserializeUser(function(obj, done) {
            done(null, obj);
        });

        // Path to attempt authentication using GitHub
        app.get('/auth/github', passport.authenticate('github'))

        // Path to handle the authentication callback
        app.get(
            '/auth/github/callback', 
            passport.authenticate('github', { failureRedirect: '/login' }), 
            (req, res) => {
                // Successful authentication, redirect home.
                res.redirect('/');
            }
        )

        return new strategy(passportStrategyOptions, onSuccess)
    }
}











