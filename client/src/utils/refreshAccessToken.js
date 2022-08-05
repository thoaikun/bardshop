import axios from "axios"

const refreshAccessToken = (refreshToken) => {
    let result = ''
    const data = JSON.stringify({
        refreshToken
    })

    const config = {
        method: 'post',
        url: 'http://localhost:3500/auth/renewAccess',
        headers: { 
            'Content-Type': 'application/json'
        },
        data
    }

    return axios(config)
}

export default refreshAccessToken