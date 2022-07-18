const bcrypt = require('bcrypt')
const User = require('../models/UserModel')
const userView = require('../views/UserView')

class UserController {
    //[POST] /user/create
    create(req, res) {
        let username = req.username
        let email = req.email
        let password = req.password

        bcrypt.hash(password, 10, (err, hash) => {
            if (!err) {
                const newUser = new User({
                    username,
                    email,
                    password: hash
                })
                newUser
                    .save()
                    .then(() => userView.create(res))
                    .catch((err) => userView.error(res, 1, err))
            }
        })
    }

    //[GET] /user/:id
    index(req, res) {
        let _id = req.id
        if (_id) {
            User.findOne({_id}).select({
                '_id': 1,
                'email': 1,
                'username': 1,
                'firstname': 1,
                'lastname': 1,
                'contactNumber': 1,
                'address': 1,
                'district': 1,
                'city': 1,
                'role': 1
            })
                .then(user => userView.index(res, user))
                .catch(() => userView.error(res, 2, null))
        }
    }

    //[PATCH] /user/edit
    edit(req, res) {
        if (req.id) {
            let _id = req.id
            User.updateOne({_id}, req.editedUser)
                .then(() => userView.edit(res))
                .catch(() => userView.error(res, 3))
        }
    }
}

module.exports = new UserController