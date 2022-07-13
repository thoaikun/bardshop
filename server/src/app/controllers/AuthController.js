const bcrypt = require('bcrypt')
const User = require('../models/UserModel')
const authView = require('../views/AuthView')

class AuthController {
    login(req, res) {
        let { username, password} = req.body
        if (!username || !password) 
            authView.error(res, 1)
        else {
            User.findOne({username: username})
                .then(user => {
                    console.log(user)
                    bcrypt.compare(password, user.password, (err, result) => {
                        if (!result)
                            authView.error(res, 3)
                        else 
                            authView.login(res)
                    })
                })
                .catch(() => authView.error(res, 2))
        }
    }
}

module.exports = new AuthController