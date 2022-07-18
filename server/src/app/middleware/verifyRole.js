const { CUSTOMER, ADMIN, EDITOR } = require('../../config/role')

const verifyRole = (allowedRoles) => {
    return (req, res, next) => {
        let role = null
        if (req.role === CUSTOMER.value)
            role = 'customer'
        else if (req.role === ADMIN.value)
            role = 'admin'
        else if (req.role === EDITOR.value)
            role = 'editor'

        if (!allowedRoles.includes(role))
            return res.sendStatus(403)
        return next()
    }
} 

module.exports = verifyRole