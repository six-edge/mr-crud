"use strict"

// const bodyParser        = require('body-parser')
// const jsonParser        = bodyParser.json()

module.exports = {
    use: (app) => {
    
        // Home
        app.get('/', (req, res) => {
            
            // Greeting
            let body = `<pre style="font-size: 5rem">Hello Mr. Server 🤪</pre>`

            // Only send user headers if authenticated
            if (req.user) {
                body += `<pre>${dumpJson(req.user)}</pre>`

                res.setHeader('x-user-display-name', req.user.displayName)
                res.setHeader('x-user-username', req.user.username)
                res.setHeader('x-user-profile-url', req.user.profileUrl)
                res.setHeader('x-user-avatar-url', req.user.avatarUrl)
                res.setHeader('x-user-roles', req.user.roles)
            }
            res.send(body)
        })

        // Session Test Page
        app.get('/session', (req, res, next) => {
            if (req.session.views) {
                req.session.views++
                res.setHeader('Content-Type', 'text/html')
                res.write('<p>views: ' + req.session.views + '</p>')
                res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
                res.end()
            } else {
                req.session.views = 1
                res.end('<p>Welcome to the session demo. Refresh!</p>')
            }
        })
    }
}

// Dump prettified object
const dumpJson = function (object) {
    return JSON.stringify(object, null, '\t')
}