class AuthView {
    login(res, accessToken, refreshToken) {
        res
            .status(200)
            .json({
                accessToken,
                refreshToken
            })
    }

    renewAccessToken(res, accessToken) {
        res
            .status(200)
            .json({
                result: 'success',
                message: 'Access token has been renew',
                accessToken
            })
    }

    logout(res) {
        res
            .status(200)
            .json({
                result: 'success',
                message: 'Logout'
            })
    }

    error(res, errCode) {
        /* 
        ** errCode: 1 -> missing username or password
        **          2 -> username doesn't exist
        **          3 -> password is incorrect
        **          4 -> access or refresh token is broken
        **          5 -> delete refresh token unsuccess
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
            case 4:
            case 5:
                res
                    .status(500)
                    .json({
                        result: 'failed',
                        message: 'Something were wrong'
                    })
                break
        }
    }
}

module.exports = new AuthView