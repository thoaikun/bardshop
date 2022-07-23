class UserView {
    create(res) {
        res
            .status(201)
            .json({ 
                result: 'success', 
                message: 'Account has been created'
            })
    }

    index(res, user) {
        res
            .status(200)
            .json({
                result: 'success',
                user
            })
    }

    edit(res) {
        res
            .status(201)
            .json({
                result: 'success',
                message: 'Account has been updated'
            })
    }

    error(res, errCode, err) {
        /* errCode: 1 -> create error message
        **          2 -> index error message   
        **          3 -> edit error message
        */

       switch(errCode) {
           case 1:
                let message = null
                if (err.message.includes('bardshop.users index: email_1 dup key:'))
                    message = 'Email had been used'
                else if (err.message.includes('bardshop.users index: username_1 dup key'))
                    message = 'Username had been used'
                res
                    .status(409)
                    .json({
                        result: 'failed', 
                        message
                    })
                break
            case 2:
                res
                    .status(404)
                    .json({
                        result: 'failed',
                        message: 'Account doesn\'t exsit'
                    })
                break
            case 3:
                res
                    .status(403)
                    .json({
                        result: 'failed',
                        message: 'Account update fail'
                    })
                break
        }
    }
}

module.exports = new UserView