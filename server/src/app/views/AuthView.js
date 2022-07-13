class AuthView {
    login(res) {
        res.status(200).json({
            message: 'success'
        })
    }

    error(res, errCode) {
        /* 
        ** errCode: 1 -> missing username or password
        **          2 -> username doesn't exist
        **          3 -> password is incorrect
        */

        switch(errCode) {
            case 1:
                res
                    .status(400)
                    .json({
                        result: 'failed',
                        message: 'Username and password are required'
                    })
                break
            case 2:
                res
                    .status(401)
                    .json({
                        result: 'failed',
                        message: 'Username doesn\'t exist'
                    })
                break
            case 3:
                res
                    .status(401)
                    .json({
                        result: 'failed',
                        message: 'Password is incorrect'
                    })
                break
        }
    }
}

module.exports = new AuthView