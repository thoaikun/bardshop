import clsx from 'clsx'
import React from 'react'
import UserContext from '../../contexts/UserContext'
import useFetchData from '../../hooks/useFetchData'
import ToastMessage from '../../components/ToastMessage/ToastMessage'

const Bill = () => {
    const {accessToken, cart, setCart, handleOrder, orderMessage, setOrderMessage} = React.useContext(UserContext)
    const {data} = useFetchData('http://localhost:3500/user', accessToken)
    const [user, setUser] = React.useState(null)
    const [totalBill, setTotalBill] = React.useState(0)
    const [shippingFee, setShippingFee] = React.useState(0)

    React.useEffect(() => {
        if (data && data?.user) {
            setUser(data.user)
        }
    }, [data])

    React.useEffect(() => {
        setTotalBill(0)
        let temp = 0
        cart.forEach((item) => {
            temp = temp + item.price*item.quantity
        })
        setTotalBill(temp)
        if (cart.length !== 0)
            setShippingFee(20)
    }, [cart])

    // handle remove toast message
    React.useEffect(() => {
        let tid = setTimeout(() => setOrderMessage(null), 1500)

        return () => {
            clearTimeout(tid)
        }
    }, [orderMessage])

    return (
        <>
            {orderMessage && orderMessage !== '' && 
                <ToastMessage
                    header={orderMessage === "success" ? "Success" : "Fail"}
                    body={orderMessage === "success" ? 'Your order has been created' : 'Create order failed'}
                />
            }
            <div className='cart-content__bill'>
                <div className="bill__address mb-2">
                    <h4>Address</h4>
                    <p className='mt-2'>
                        {user && user?.address !== '' && user?.district !== '' && user?.city !== '' ? 
                        `${user.address},${user.district}, ${user.city}` : 
                        'Please update your address'}
                    </p>
                </div>
                <div className="bill__price mb-2">
                    <h4 className="mb-2">Hoa don</h4>
                    <div>
                        <div>
                            <p>Tam tinh</p>
                            <p className="fs-5 minus-text">{`-\u0024 ${totalBill}`}</p>
                        </div>
                        <div>
                            <p>Phi ship</p>
                            <p className="fs-5 minus-text">{`-\u0024 ${shippingFee}`}</p>
                        </div>
                        <hr/>
                        <div>
                            <p>Tong tien</p>
                            <p className="fs-5 minus-text">{`-\u0024 ${totalBill + shippingFee}`}</p>
                        </div>
                    </div>
                </div>
                <button
                    className={clsx('btn', 'button__submit', {
                        'disabled': cart.length === 0 || user?.address === '' || user?.district === '' || user?.city === ''
                    })}
                    onClick={() => {
                        if (cart.length !== 0) {
                            handleOrder(user.id, cart)
                            setCart([])
                        }
                    }}
                >
                    Order
                </button>
            </div>
        </>
    )
}

export default Bill