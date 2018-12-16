"use strict"

// Load .env file
require('dotenv').config()

// Session Options
const sessionOptions = { 
    secret: "crudinthemudtakingathud", 
    saveUninitialized: true,
    rolling: true,
    resave: true,
    cookie  : {
        maxAge: 1000 * 60 * 60 * 1, // 1 hour
    },
}

// Express
const express    = require('express')
const app        = express()
const bodyParser = require('body-parser')
const session    = require("express-session")(sessionOptions)
const jsonParser = bodyParser.json()
const port       = process.env.PORT || 5000

// Passport users are allocated roles in env vars
const admins = process.env.ROLE_ADMIN.split(",")
const users  = process.env.ROLE_USER.split(",")

// Passport using GitHub Strategy
const passport = require('passport')
const strategy = require('passport-github').Strategy

// Server dist folder as root /
app.use(express.static('dist'))

// Initialize session
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

// Passport authenticated session persistence
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

// Passport strategy options
const strategyOptions = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `http://localhost:${port}/auth/github/callback`
}

// Attaches roles to users 
const applyRoles = function(user) {
    user.roles = []
    if (users.includes(user.username))
        user.roles.push('ROLE_USER')
    
    if (admins.includes(user.username))
        user.roles.push('ROLE_ADMIN')
    
    return user
}

// On successful authentication
const onSuccess = function(accessToken, refreshToken, profile, done) {
    
    // Callback expects an error and user object
    return done(null, applyRoles(profile))
}

// Gets only relevant user data
const getUserDto = function(user) {
    return {
        displayName: user.displayName,
        username: user.username,
        profileUrl: user.profileUrl,
        avatarUrl: user._json.avatar_url,
        roles: user.roles
    }
}

// Passport Auth
passport.use(new strategy(strategyOptions, onSuccess));

// Path to attempt authentication using GitHub
app.get('/auth/github', passport.authenticate('github'));

// Path to handle the authentication callback
app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// Default test page
app.get('/', (req, res) => {
    
    // Greeting
    let greeting = `<pre style="font-size: 5rem">Hello Mr. Server 🤪</pre>`

    // Only send user headers if authenticated
    if (req.user) {
        greeting += `<pre>${dumpJson(req.user)}</pre>`

        res.setHeader('x-user-display-name', req.user.displayName)
        res.setHeader('x-user-username', req.user.username)
        res.setHeader('x-user-profile-url', req.user.profileUrl)
        res.setHeader('x-user-avatar-url', req.user._json.avatar_url)
        res.setHeader('x-user-roles', req.user.roles)
    }
    res.send(greeting)
});

// Listen for incoming requests
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})

// Dump prettified object
const dumpJson = function (object) {
    return JSON.stringify(object, null, '\t')
}

