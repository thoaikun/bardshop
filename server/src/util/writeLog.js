const fs = require('fs')
const { dirname } = require('path')
const appDir = dirname(require.main.filename)

const writeLog = async (errorMessage, controller) => {
    const date = new Date()
    const message = `[${date.toString()}] ${controller}.controller ${errorMessage}`

    fs.writeFile(`${appDir}/log/error.log`, message, err => console.log(err))
}

module.exports = writeLog