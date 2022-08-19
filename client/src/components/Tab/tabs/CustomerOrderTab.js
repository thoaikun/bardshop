import React from 'react'
import axios from 'axios'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'
import useFetchData from '../../../hooks/useFetchData'
import UserContext from '../../../contexts/UserContext'

const ProductListElement = ({productId, quantity}) => {
    const {data} = useFetchData(`http://localhost:3500/product/${productId}`)
    const [product, setProduct] = React.useState([])

    React.useEffect(() => {
        if (data && data?.product)
            setProduct(data.product)
    }, [data])

    return (
        <li>{product?.name} (Quantity: {quantity})</li>
    )
}

const CustomerOrderTableElement = ({order, items, owner, trash, handleDelete, handleDestroy}) => {
    return (
        <tr>
            <td>
                <ol>
                    {items?.map((item, i) => (
                        <ProductListElement 
                            key={i}
                            productId={item?.productId}
                            quantity={item?.quantity}
                        />
                    ))}
                </ol>
            </td>
            <td>{owner?.username ? owner.username : ''}</td>
            <td>{order?.createdAt ? new Date(order?.createdAt).toDateString() : ''}</td>
            <td>{`${owner.address}, ${owner.district}, ${owner.city}`}</td>
            <td>
                <div className='d-flex flex-column gap-2'>
                    <div 
                        className="btn btn-danger"
                        onClick={() => {
                            if (!trash && window.confirm('Are you sure want to delete this item ?'))
                                handleDelete(order._id)
                            else if (trash && window.confirm('Are you sure want to destroy this item ?'))
                                handleDestroy(order._id)
                        }}
                    >
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </div>
                </div>
            </td>
        </tr>
    )
}

const CustomerOrderTab = ({selectedTab}) => {
    const {accessToken} = React.useContext(UserContext)
    const {data} = useFetchData('http://localhost:3500/order', accessToken)
    const {data:data2} = useFetchData('http://localhost:3500/order/deletedList', accessToken)
    const [customerOrders, setCustomerOrders] = React.useState([])
    const [deleteOrders, setDeleteOrders] = React.useState([])
    const [showOrders, setShowOrders] = React.useState([])
    const [deleteMessage, setDeleteMessage] = React.useState('')
    const [trash, setTrash] = React.useState(false)

    React.useEffect(() => {
        setCustomerOrders(data.orders)
        setDeleteOrders(data2.orders)
    }, [data])

    React.useEffect(() => {
        if (!trash)
            setShowOrders(customerOrders)
        else 
            setShowOrders(deleteOrders)
    }, [customerOrders, deleteOrders])
    
    React.useEffect(() => {
        if (trash)
            setShowOrders(deleteOrders)
        else
            setShowOrders(customerOrders)
    }, [trash])

    const handleDelete = (id) => {
        if (id) {
            const config = {
                method: 'delete',
                url: `http://localhost:3500/order/delete/${id}`,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            }
            axios(config)
                .then(response => {
                    let deletedOrder = customerOrders.find(order => order._id === id)
                    let newList = customerOrders.filter((order) => order._id !== id)
                    setCustomerOrders(newList)
                    setDeleteOrders([...deleteOrders, deletedOrder])
                    setDeleteMessage(response.data.result)
                })
                .catch(error => setDeleteMessage(error.response.data.result))
        }
    }

    const handleDestroy = (id) => {
        if (id) {
            const config = {
                method: 'delete',
                url: `http://localhost:3500/order/force/${id}`,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            }
            axios(config)
                .then(response => {
                    let newList = deleteOrders.filter((order) => order._id !== id)
                    setDeleteOrders(newList)
                    setDeleteMessage(response.data.result)
                })
                .catch(error => setDeleteMessage(error.response.data.result))
        }
    }

    return (
        <div className={clsx('customer-order', {
            'disappear': selectedTab !== 'Order'
        })}>
            <div className='d-flex gap-2'>
                <div 
                    className={clsx('add-btn', {
                        'deactive': !trash,
                        'active': trash
                    })}
                    onClick={() => setTrash(!trash)}
                >
                    Trash can {`(${deleteOrders?.length ? deleteOrders.length : 0})`}
                </div>
            </div>

            {showOrders && showOrders?.length !== 0 ?
                <table className="item-table" style={{'width': '1200px'}}>
                    <thead>
                        <tr>
                            <th>Items</th>
                            <th>By</th>
                            <th>Time</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {showOrders?.map((item, i) => (
                            <CustomerOrderTableElement
                                key={i}
                                order={item}
                                items={item.orderList}
                                owner={item.userId}
                                trash={trash}
                                handleDelete={handleDelete}
                                handleDestroy={handleDestroy}
                            />
                        ))}
                    </tbody>
                </table>
                :
                <p className='text-muted fs-4 pt-2'>No customer orders found</p>
            }
        </div>
    )
}

export default CustomerOrderTab