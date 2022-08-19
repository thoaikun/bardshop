import axios from 'axios'
import React from 'react'
import { CookiesProvider, useCookies } from 'react-cookie'
import refreshAccessToken from '../utils/refreshAccessToken'

const UserContext = React.createContext({})

export const UserProvider = ({ children }) => {
    const [userCookies, setUserCookies, removeUserCookies] = useCookies(['user'])
    const [login, setLogin] = React.useState(userCookies && userCookies?.login ? userCookies.login : false)
    const [accessToken, setAccessToken] = React.useState(userCookies && userCookies?.accessToken ? userCookies.accessToken : '')
    const [refreshToken, setRefreshToken] = React.useState(userCookies && userCookies?.refreshToken ? userCookies.refreshToken : '')
    const [cart, setCart] = React.useState(userCookies && userCookies.cart ? userCookies.cart : [])
    const [loginErr, setLoginErr] = React.useState('')
    const [signupErr, setSignupErr] = React.useState(undefined)
    const [updateMessage, setUpdateMessage] = React.useState()
    const [addToCartMessage, setAddToCartMessage] = React.useState()
    const [orderMessage, setOrderMessage] = React.useState()
    const [autoRefreshId, setAutoRefreshId] = React.useState(null)

    React.useEffect(() => {
        if (accessToken !== '' && refreshToken !== '') {
            let time = 3 * 3600
            setUserCookies('accessToken', accessToken, {path: '/', maxAge: time})
            setUserCookies('refreshToken', refreshToken, {path: '/', maxAge: time})
            setUserCookies('login', login, {path: '/', maxAge: time})

            setAutoRefreshId(setInterval(() => {
                let newAccessToken = refreshAccessToken(refreshToken)
                newAccessToken
                    .then(response => response.data?.accessToken ? setAccessToken(response.data.accessToken) : null)
                    .catch((error) => console.log(error))
                
            }, 7*60*1000))
        }
        else {
            removeUserCookies('accessToken')
            removeUserCookies('refreshToken')
            removeUserCookies('login')
        }
    }, [accessToken, refreshToken, login])

    React.useEffect(() => {
        if (cart.length !== 0) {
            let time = 3 * 3600
            setUserCookies('cart', cart, {path: '/', maxAge: time})
        }
        else 
            removeUserCookies('cart')
    }, [cart])

    const handleLogin = (username, password) => {
        if (username === '')
            setLoginErr('Please enter username')
        else if (password === '')
            setLoginErr('Please enter password')
        else {
            const data = JSON.stringify({
                username: username,
                password: password
            })
            const config = {
                method: 'post',
                url: 'http://localhost:3500/auth/login',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : data
            }
            axios(config)
                .then(response => {
                    if (response.data?.accessToken && response.data?.refreshToken) {
                        setAccessToken(response.data.accessToken)
                        setRefreshToken(response.data.refreshToken)
                        setLogin(true)
                    }
                })
                .catch((error) => {
                    setLoginErr(error.response.data.message)
                })
        }
    }

    const handleLogout = async () => {
        const data = JSON.stringify({
            refreshToken
        })
        const config = {
            method: 'post',
            url: 'http://localhost:3500/auth/logout',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
        }
        await axios(config)
        setLogin(false)
        setAccessToken('')
        setRefreshToken('')
        setLoginErr('')
        setCart([])
        if (autoRefreshId) {
            clearInterval(autoRefreshId)
            setAutoRefreshId(null)
        }
    }

    const handleCreate = (email, password, username) => {
        const data = JSON.stringify({
            username,   
            email,
            password
        })
        const config = {
            method: 'post',
            url : 'http://localhost:3500/user/create',
            headers :{
                'Content-Type': 'application/json'
            },
            data : data
        }
        axios(config)
            .then(response => {
                setSignupErr(undefined)
            })
            .catch(error => {
                setSignupErr(error.response.data.message)
            })
    }

    const handleUpdate = async (firstName, lastName, email, contactNumber, address, city, district) => {
        const data = JSON.stringify({
            firstname: firstName,
            lastname: lastName,
            contactNumber,
            email,
            address,
            city,
            district
        })
        const config = {
            method: 'patch',
            url: 'http://localhost:3500/user/edit',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            },
            data : data
        }
        axios(config)
            .then(response => {
                setUpdateMessage(response.data.result)
            })
            .catch(error => {
                setUpdateMessage(error.response.data.result)
            })
    }

    const handleAddToCart = (id, name, brand, imgs, price, quantity) => {
        const newItem = {
            id, 
            name,
            brand,
            imgs, 
            price,
            quantity
        }
        if (cart.filter(item => item.id === newItem.id).length === 0) {
            setCart([...cart, newItem])
            setAddToCartMessage('Product has been add to your cart')
        }
        else {
            setAddToCartMessage('Product has already in your cart')
        }
    }

    const handleRemoveFromCart = (id) => {
        const newList = cart.filter(item => item.id !== id)
        setCart(newList)
    }

    const handleUpdateCardElementQuantity = (id, quantity) => {
        const newList = [...cart]
        newList.forEach((item) => {
            if (item.id === id)
                item.quantity = quantity
        })
        setCart(newList)
    }

    const handleOrder = async (userId, cartList) => {
        const data = {
            orderList: []
        }
        cartList.forEach(product => {
            data.orderList.push({
                productId: product.id,
                quantity: product.quantity
            })
        })
        console.log(data)
        const config = {
            method: 'post',
            url: 'http://localhost:3500/order/create',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            },
            data : JSON.stringify(data)
        }
        axios(config)
            .then(response => setOrderMessage(response.data.result))
            .catch(error => setOrderMessage(error?.response?.data?.result))
    }

    const handleAddComment = async (comment) => {
        const config = {
            method: 'post',
            url: 'http://localhost:3500/review/create',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            },
            data : JSON.stringify(comment)
        }
        const response = await axios(config)
        if (response.data.message === 'error')
            return false
        return true
    }

    return (
        <CookiesProvider>
            <UserContext.Provider
                value={{
                    login,
                    setLogin,
                    accessToken,
                    refreshToken,
                    setAccessToken,
                    setRefreshToken,
                    loginErr,
                    setLoginErr,
                    signupErr,
                    setSignupErr,
                    updateMessage,
                    setUpdateMessage,
                    cart,
                    setCart,
                    addToCartMessage,
                    setAddToCartMessage,
                    orderMessage,
                    setOrderMessage,
                    handleLogin,
                    handleLogout,
                    handleCreate,
                    handleUpdate,
                    handleAddToCart,
                    handleRemoveFromCart,
                    handleUpdateCardElementQuantity,
                    handleOrder,
                    handleAddComment
                }}
            >
                {children}
            </UserContext.Provider>
        </CookiesProvider>
    )

}

export default UserContext