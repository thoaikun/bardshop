import clsx from 'clsx'
import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'
import ToastMessage from '../../ToastMessage/ToastMessage'
import useFetchData from '../../../hooks/useFetchData'
import UserContext from '../../../contexts/UserContext'

const ProductTableElement = ({id, name, images, createdDate, modifiedDate, handleDelete, handleDestroy, handleRestore, trash}) => {
    return (
        <tr>
            <td>{name ? name : ''}</td>
            <td>
                <img src={`http://localhost:3500/imgs/product/${images[images?.length - 1]}`} alt={name} style={{width: '200px'}}/>
            </td>
            <td>{new Date(createdDate).toDateString()}</td>
            <td>{new Date(modifiedDate).toDateString()}</td>
            <td>
                <div className='d-flex flex-column gap-2'>
                    <div 
                        className="btn btn-danger"
                        onClick={() => {
                            if (!trash && window.confirm('Are you sure want to delete this item ?'))
                                handleDelete(id)
                            else if (trash && window.confirm('Are you sure want to destroy this item ?'))
                                handleDestroy(id)
                        }}
                    >
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </div>
                    {trash ? 
                        <div
                            className="btn btn-success" 
                            onClick={() => handleRestore(id)}
                        >
                            <FontAwesomeIcon icon={faArrowRotateRight}></FontAwesomeIcon>
                        </div>
                        :
                        <Link 
                            to={`/products/edit/${id}`}
                            className="btn btn-primary"
                        >
                            <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
                        </Link>
                    }
                </div>
            </td>
        </tr>
    )
}

const ProductTab = ({selectedTab}) => {
    const {accessToken} = React.useContext(UserContext)
    const {data} = useFetchData('http://localhost:3500/product')
    const {data:data2} = useFetchData('http://localhost:3500/product/deletedlist', accessToken)
    const [products, setProducts] = React.useState([])
    const [deleteProducts, setDeleteProducts] = React.useState([])
    const [showProducts, setShowProducts] = React.useState([])
    const [deleteMessage, setDeleteMessage] = React.useState('')
    const [trash, setTrash] = React.useState(false)

    React.useEffect(() => {
        setProducts(data.products)
        setDeleteProducts(data2.products)
    }, [data, data2])

    React.useEffect(() => {
        if (!trash)
            setShowProducts(products)
        else 
            setShowProducts(deleteProducts)
    }, [products, deleteProducts])
    
    React.useEffect(() => {
        if (trash)
            setShowProducts(deleteProducts)
        else
            setShowProducts(products)
    }, [trash])

    // handle remove toast message
    React.useEffect(() => {
        let tid = setTimeout(() => setDeleteMessage(null), 1500)

        return () => {
            clearTimeout(tid)
        }
    }, [deleteMessage])

    const handleDelete = (id) => {
        if (id) {
            const config = {
                method: 'delete',
                url: `http://localhost:3500/product/delete/${id}`,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            }
            axios(config)
                .then(response => {
                    let deletedProduct = products.find(product => product._id === id)
                    let newList = products.filter((product) => product._id !== id)
                    setProducts(newList)
                    setDeleteProducts([...deleteProducts, deletedProduct])
                    setDeleteMessage(response.data.result)
                })
                .catch(error => setDeleteMessage(error.response.data.result))
        }
    }

    const handleDestroy = (id) => {
        if (id) {
            const config = {
                method: 'delete',
                url: `http://localhost:3500/product/force/${id}`,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            }
            axios(config)
                .then(response => {
                    let newList = deleteProducts.filter((product) => product._id !== id)
                    setDeleteProducts(newList)
                    setDeleteMessage(response.data.result)
                })
                .catch(error => setDeleteMessage(error.response.data.result))
        }
    }

    const handleRestore = (id) => {
        if (id) {
            const config = {
                method: 'patch',
                url: `http://localhost:3500/product/restore/${id}`,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            }
            axios(config)
                .then(response => {
                    let restoreProduct = deleteProducts.find(product => product._id === id)
                    let newList = deleteProducts.filter((product) => product._id !== id)
                    setDeleteProducts(newList)
                    setProducts([...products, restoreProduct])
                    setDeleteMessage(response.data.result)
                })
                .catch(error => setDeleteMessage(error.response.data.result))
        }
    }

    return (
        <>
            {deleteMessage && deleteMessage !== '' && 
                <ToastMessage 
                    header={deleteMessage === 'success' ? "Success" : "Fail"}
                    body={`Delete product ${deleteMessage}`}
                />
            }
            <div className={clsx('products', {
                'disappear': selectedTab !== 'Products'
            })}>
                <div className='d-flex gap-2'>
                    <div className="add-btn">
                        <Link to="/products/add">
                            Add product
                        </Link>
                    </div>
                    <div 
                        className={clsx('add-btn', {
                            'deactive': !trash,
                            'active': trash
                        })}
                        onClick={() => setTrash(!trash)}
                    >
                        Trash can {`(${deleteProducts?.length ? deleteProducts.length : 0})`}
                    </div>
                </div>

                {showProducts && showProducts?.length !== 0 ? 
                    <table className="item-table" style={{'width': '1200px'}}>
                        <thead>
                            <tr>
                                <th>Product name</th>
                                <th>Picture</th>
                                <th>Created</th>
                                <th>Modified</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {showProducts?.length !== 0 && showProducts?.map((product, i) => (
                                <ProductTableElement  
                                    key={i}
                                    id={product?._id ? product._id : ''}
                                    name={product?.name ? product.name : ''}
                                    images={product?.imgs ? product.imgs : ''}
                                    createdDate={product?.createdAt ? product.createdAt : ''}
                                    modifiedDate={product?.modifiedAt ? product.modifiedAt : ''}
                                    handleDelete={handleDelete}
                                    handleDestroy={handleDestroy}
                                    handleRestore={handleRestore}
                                    trash={trash}
                                />
                            ))}
                        </tbody>
                    </table>
                    :
                    <p className='text-muted fs-4 pt-2'>No products found</p>
                }
            </div>
        </>
    )
}

export default ProductTab