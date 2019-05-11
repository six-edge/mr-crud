"use strict"

const fs = require('fs');

// const bodyParser        = require('body-parser')
// const jsonParser        = bodyParser.json()

module.exports = {
    use: (app) => {

        // SPA route that injects node server data into the response
        app.get('/', (req, res) => {
            
            // Preventing caching due to user data in the DOM
            res.set('Cache-Control', 'no-cache, no-store, must-revalidate')

            // Serve the 
            fs.readFile('./dist/index.html', (error, data) => {
                
                if (error) throw error

                const payload = JSON.stringify(req.user || {})
                const html = `<script type="application/json" id="node">${payload}</script>`
                const el = '<script data-node></script>'

                res.end(data.toString().replace(el, html))
            });
        })

        // Mr. Server
        app.get('/test', (req, res) => {
            res.send(`<pre style="font-size: 5rem">Hello Mr. Server 🤪</pre>`)
        })

        // User Profile
        app.get('/profile', (req, res) => {
            
            // Only send user headers if authenticated
            if (req.user) {
                res.setHeader('x-user-display-name', req.user.displayName)
                res.setHeader('x-user-username', req.user.username)
                res.setHeader('x-user-profile-url', req.user.profileUrl)
                res.setHeader('x-user-avatar-url', req.user.avatarUrl)
                res.setHeader('x-user-roles', req.user.roles)
            }
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify(req.user || {}))
        })

        // Session Test Page
        app.get('/session', (req, res, next) => {
            if (req.session.views) {
                req.session.views++
            } else {
                req.session.views = 1
            }
            res.setHeader('Content-Type', 'application/json')
            res.send(`{ "views": ${req.session.views}, "expires": ${(req.session.cookie.maxAge / 1000)} }`)
        })

        // Logout
        app.get('/auth/logout', function(req, res){
            req.logout();
            res.redirect('/');
        });
    }
}