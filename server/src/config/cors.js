const whiteList = ['http://localhost:3000', 'http://localhost:3500', 'undefined']

const corsOption = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true)
        }
        else {
            callback(new Error('Not allow by CORS'))
        }
    }
}

module.exports = { whiteList, corsOption}