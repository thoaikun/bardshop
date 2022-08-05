import React from "react"
import axios from "axios"

const useFetchData = (baseUrl, accessToken) => {
    const [data, setData] = React.useState([])
    const [fetchErr, setFetchErr] = React.useState('')

    React.useEffect(() => {
        const source = axios.CancelToken.source()

        const fetchData= async (url) => {
            try {
                const respone = await axios(url, {
                    cancelToken: source.token,
                    headers: accessToken ? {'Authorization': `Bearer ${accessToken}`} : {}
                })
                setData(respone.data)
                setFetchErr('')
            }
            catch (err) {
                setData([])
                setFetchErr(err.message)
            }
        }
        fetchData(baseUrl)

        return () => {
            source.cancel()
        }
    }, [baseUrl])

    return {data, fetchErr}
}

export default useFetchData