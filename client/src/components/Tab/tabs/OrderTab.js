import clsx from 'clsx'
import React from 'react'
import axios from 'axios'
import useFetchData from '../../../hooks/useFetchData'
import UserContext  from '../../../contexts/UserContext'

const OrderCardElement = ({product, quantity}) => {
    return (
        <div className="order-card__product">
            <div className="d-flex align-items-center gap-3">
                <img 
                    src={`http://localhost:3500/imgs/product/${product?.imgs ? product.imgs[product.imgs?.length - 1] : ''}`} 
                    alt={product?.name}
                    style={{
                        width: '150px'
                    }}
                />
                <div>
                    <p><b>{product?.name ? product.name : 'Unknowned'}</b></p>
                    <p><b>Quantity:</b> {quantity ? quantity : '1'}</p>
                </div>
            </div>
            <p>Price: {product?.price ? product.price * quantity : ''}</p>
        </div>
    )
}

const OrderCard = ({id, products, handleCancelOrder}) => {
    return (
        <div className="order-card">
            {products && products.map((product, i) => (
                <OrderCardElement 
                    key={i}
                    product={product.productId}
                    quantity={product.quantity}
                />
            ))}
            <div 
                className='btn btn-danger cancel-btn'
                onClick={() => {
                    if (window.confirm('Are you sure want to cancel this order ?'))
                        handleCancelOrder(id)
                }}
            >
                Cancel Order
            </div>
        </div>
    )
}


const OrderTab = ({selectedTab}) => {
    const {accessToken} = React.useContext(UserContext)
    const {data} = useFetchData(`http://localhost:3500/order/getByUser`, accessToken)
    const [orders, setOrders] = React.useState()
    const [cancelOrderMessage, setCancelOrderMessage] = React.useState()

    React.useEffect(() => {
        console.log(data)
        if (data && data?.orders)
            setOrders(data.orders)
    }, [data])

    const handleCancelOrder = (orderId) => {
        if (orderId) {
            const config = {
                method: 'delete',
                url: `http://localhost:3500/order/delete/${orderId}`,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            }
            axios(config)
                .then(response => {
                    let newList = orders?.filter(order => order._id !== orderId)
                    setOrders(newList)
                    setCancelOrderMessage(response.data?.result)
                })
                .catch(error => setCancelOrderMessage(error?.response?.data?.result))
        }
    }

    return (
        <>
            <div 
                className={clsx("orders", {
                    "disappear": selectedTab !== "Order"
                })}
            >
                {orders && orders?.length !== 0 && orders?.map((order, i) => (
                    <OrderCard 
                        key={i}
                        id={order?._id}
                        products={order?.orderList}
                        handleCancelOrder={handleCancelOrder}
                    />
                ))}
                {orders && orders?.length === 0 && <p className='fs-5 text-center text-muted'>No order found</p>}
            </div>
        </>
    )
}

export default OrderTab