const writeLog = require('../../util/writeLog')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const User = require('../models/user/user.model')
const authView = require('../views/auth.view')

class AuthController {
    login(req, res) {
        let { username, password} = req.body
        if (!username || !password) 
            authView.error(res, 1)
        else {
            User.findOne({username: username})
                .then(user => {
                    bcrypt.compare(password, user.password, (err, result) => {
                        if (!result)
                            authView.error(res, 3)
                        else {
                            const accessToken = jwt.sign(
                                { 
                                    id: user._id,
                                    username: user.username,
                                    role: user.role
                                },
                                process.env.ACCESS_TOKEN_SECRET,
                                { expiresIn: '10m' }
                            )
                            const refreshToken = jwt.sign(
                                { 
                                    id: user._id,
                                    username: user.username,
                                    role: user.role
                                },
                                process.env.REFRESH_TOKEN_SECRET,
                                { expiresIn: '1d' }
                            )

                            // save refreshToken to BD
                            User.findByIdAndUpdate({_id: user._id}, {refreshToken})
                                .then(() => authView.login(res, accessToken, refreshToken))
                                .catch((err) => {
                                    writeLog(err.message, 'Auth')
                                    authView.error(res, 4)
                                })
                        }       
                    })
                })
                .catch(() => authView.error(res, 2))
        }
    }

    renewAccessToken(req, res) {
        let refreshToken = req.body.refreshToken
        if (refreshToken) {
            User.findOne({refreshToken: refreshToken})
                .then(user => {
                    jwt.verify(
                        refreshToken,
                        process.env.REFRESH_TOKEN_SECRET,
                        (err, decoded) => {
                            if (err || user.username !== decoded.username || user.role !== decoded.role) {
                                res.sendStatus(403)
                            }
                            else {
                                const accessToken = jwt.sign(
                                    { 
                                        id: user._id,
                                        username: user.username,
                                        role: user.role
                                    },
                                    process.env.ACCESS_TOKEN_SECRET,
                                    { expiresIn: '5m' }
                                )

                                authView.renewAccessToken(res, accessToken)
                            }
                        }
                    )
                })
                .catch((err) => {
                    writeLog(err.message, 'Auth')
                })
        }
        else 
            res.sendStatus(401)
    }

    logout(req, res) {
        let refreshToken = req.body.refreshToken
        if (refreshToken) {
            User.updateOne({refreshToken}, {refreshToken: null})
                .then(() => authView.logout(res))
                .catch((err) => {
                    writeLog(err.message, 'Auth')
                    authView.error(res, 5)
                })
        }
        else
            res.sendStatus(204)
    }
}

module.exports = new AuthController